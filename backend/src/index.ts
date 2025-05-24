import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import cors from "cors";
import bcrypt from "bcrypt";
import { userMiddleware } from "./middleware";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      username,
      password: hashedPassword,
    });

    res.json({
      message: "User signed up",
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    // Find user by username only (not password)
    const existingUser = await UserModel.findOne({
      username
    });

    if (existingUser) {
      // Compare the plain text password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      
      if (isPasswordValid) {
        const token = jwt.sign({
          id: existingUser._id
        }, JWT_PASSWORD);

        res.json({
          token
        });
      } else {
        res.status(403).json({
          message: "Incorrect credentials"
        });
      }
    } else {
      res.status(403).json({
        message: "Incorrect credentials"
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;

  await ContentModel.create({
    link,
    type,
    title: req.body.title,
    userId: req.userId,
    tags: [],
  });

  res.json({
    message: "Content added",
  });
});

app.get("/api/v1/content", userMiddleware,async (req, res) => {
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId", "username");
  res.json({
    content,
  });
});

app.delete("/api/v1/content", userMiddleware,async (req, res) => {
  const contentId = req.body.contentId;

  await ContentModel.deleteMany({
    contentId,
    userId: req.userId,
  });

  res.json({
    message: "Deleted",
  });
});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000);
