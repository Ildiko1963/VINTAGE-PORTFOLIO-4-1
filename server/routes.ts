import { Router } from "express";
import { z } from "zod";
import { storage } from "./storage";
import { insertServiceSchema, insertPortfolioItemSchema, insertContactFormSchema } from "@shared/schema";

const router = Router();

// Services routes
router.get("/api/services", async (req, res) => {
  try {
    const services = await storage.getServices();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

router.get("/api/services/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid service ID" });
    }

    const service = await storage.getService(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch service" });
  }
});

router.post("/api/services", async (req, res) => {
  try {
    const validatedData = insertServiceSchema.parse(req.body);
    const newService = await storage.createService(validatedData);
    res.status(201).json(newService);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create service" });
  }
});

// Portfolio routes
router.get("/api/portfolio", async (req, res) => {
  try {
    const portfolioItems = await storage.getPortfolioItems();
    res.json(portfolioItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch portfolio items" });
  }
});

router.get("/api/portfolio/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid portfolio item ID" });
    }

    const item = await storage.getPortfolioItem(id);
    if (!item) {
      return res.status(404).json({ error: "Portfolio item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch portfolio item" });
  }
});

router.post("/api/portfolio", async (req, res) => {
  try {
    const validatedData = insertPortfolioItemSchema.parse(req.body);
    const newItem = await storage.createPortfolioItem(validatedData);
    res.status(201).json(newItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create portfolio item" });
  }
});

// Contact form routes
router.post("/api/contact", async (req, res) => {
  try {
    const validatedData = insertContactFormSchema.parse(req.body);
    const newForm = await storage.createContactForm(validatedData);
    res.status(201).json({ message: "Message sent successfully", id: newForm.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
