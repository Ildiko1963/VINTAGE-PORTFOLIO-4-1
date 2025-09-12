import { Service, PortfolioItem, ContactForm, InsertService, InsertPortfolioItem, InsertContactForm } from "@shared/schema";

export interface IStorage {
  // Services
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Portfolio Items
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItem(id: number): Promise<PortfolioItem | undefined>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;

  // Contact Forms
  createContactForm(form: InsertContactForm): Promise<ContactForm>;
}

export class MemStorage implements IStorage {
  private services: Service[] = [
    {
      id: 1,
      title: "Design",
      description: "Kreatív tervezési szolgáltatások vintage stílusban",
      features: ["Logó tervezés", "Grafikai arculat", "Print design"],
      icon: "palette",
      createdAt: new Date()
    },
    {
      id: 2,
      title: "Construction",
      description: "Belső terek vintage átalakítása és kivitelezése",
      features: ["Tér tervezés", "Bútor készítés", "Dekoráció"],
      icon: "hammer",
      createdAt: new Date()
    },
    {
      id: 3,
      title: "Consulting",
      description: "Szakértői tanácsadás vintage projektekhez",
      features: ["Stílus tanácsadás", "Projekt menedzsment", "Költségvetés tervezés"],
      icon: "comments",
      createdAt: new Date()
    }
  ];

  private portfolioItems: PortfolioItem[] = [
    // Industrial projects - CORRECTED ORDER: indusztrial2 first, indusztrial last
    {
      id: 1,
      title: "Indusztriális Tervezés II",
      description: "Modern gyártósor vintage esztétikával",
      imageUrl: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      additionalImages: [
        "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
      ],
      category: "industrial",
      createdAt: new Date()
    },
    {
      id: 2,
      title: "Vintage Gépészet",
      description: "Klasszikus ipari berendezések restaurálása",
      imageUrl: "https://pixabay.com/get/g8ef6961b7a250ff11e50bd621f4daafd07772dc586c7cb7ce78fb21e6bb95f3df647bd69787a52036f6673a8273729d8bcf5b12ac79f5f3edf25f032093967d6_1280.jpg",
      additionalImages: [],
      category: "industrial",
      createdAt: new Date()
    },
    {
      id: 3,
      title: "Indusztriális Projekt",
      description: "Klasszikus ipari design elemek",
      imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      additionalImages: [
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
        "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
      ],
      category: "industrial",
      createdAt: new Date()
    },
    // Creative projects
    {
      id: 4,
      title: "Vintage Plakát Design",
      description: "Retro stílusú grafikai tervezés",
      imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      additionalImages: [],
      category: "creative",
      createdAt: new Date()
    },
    {
      id: 5,
      title: "Brand Identitás",
      description: "Teljes arculattervezés vintage elemekkel",
      imageUrl: "https://pixabay.com/get/gb432c7f54447f303731807d1c2af6a03fc42e77c4b61ef34759bf208b589a3c585165b48b92dd43e9ceaab92b1bcfbb1c9b89049aeb0ec6742bb724872aeb653_1280.jpg",
      additionalImages: [],
      category: "creative",
      createdAt: new Date()
    },
    {
      id: 6,
      title: "Tipográfia Művészet",
      description: "Kézzel készített betűtípusok",
      imageUrl: "https://pixabay.com/get/gb36e871e37d595d2386ce22ac3e2d1de96f3ed3807c5b87f375166f7e7b49d17c1089dbb92172b99f9e399de74f368053e3b4e212e4ebe59070580e12dcf9994_1280.jpg",
      additionalImages: [],
      category: "creative",
      createdAt: new Date()
    },
    // Photography projects
    {
      id: 7,
      title: "Vintage Portré",
      description: "Klasszikus fotózási technikák",
      imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      additionalImages: [],
      category: "photography",
      createdAt: new Date()
    },
    {
      id: 8,
      title: "Táj Fotográfia",
      description: "Természet vintage szemmel",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      additionalImages: [],
      category: "photography",
      createdAt: new Date()
    },
    {
      id: 9,
      title: "Utcai Fotográfia",
      description: "Városi élet dokumentálása",
      imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      additionalImages: [],
      category: "photography",
      createdAt: new Date()
    }
  ];

  private contactForms: ContactForm[] = [];

  async getServices(): Promise<Service[]> {
    return this.services;
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.find(service => service.id === id);
  }

  async createService(service: InsertService): Promise<Service> {
    const newService: Service = {
      id: this.services.length + 1,
      ...service,
      createdAt: new Date()
    };
    this.services.push(newService);
    return newService;
  }

  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return this.portfolioItems;
  }

  async getPortfolioItem(id: number): Promise<PortfolioItem | undefined> {
    return this.portfolioItems.find(item => item.id === id);
  }

  async createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem> {
    const newItem: PortfolioItem = {
      id: this.portfolioItems.length + 1,
      ...item,
      createdAt: new Date()
    };
    this.portfolioItems.push(newItem);
    return newItem;
  }

  async createContactForm(form: InsertContactForm): Promise<ContactForm> {
    const newForm: ContactForm = {
      id: this.contactForms.length + 1,
      ...form,
      createdAt: new Date()
    };
    this.contactForms.push(newForm);
    return newForm;
  }
}

export const storage = new MemStorage();
