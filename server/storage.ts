import { 
  users, type User, type InsertUser,
  portfolioItems, type PortfolioItem, type InsertPortfolioItem,
  services, type Service, type InsertService,
  contactFormSchema, type ContactForm
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Portfolio methods
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItem(id: number): Promise<PortfolioItem | undefined>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  
  // Service methods
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Contact form method
  submitContactForm(form: ContactForm): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portfolioItemsMap: Map<number, PortfolioItem>;
  private servicesMap: Map<number, Service>;
  private contactForms: ContactForm[];
  
  private userCurrentId: number;
  private portfolioCurrentId: number;
  private serviceCurrentId: number;

  constructor() {
    this.users = new Map();
    this.portfolioItemsMap = new Map();
    this.servicesMap = new Map();
    this.contactForms = [];
    
    this.userCurrentId = 1;
    this.portfolioCurrentId = 1;
    this.serviceCurrentId = 1;
    
    // Initialize with sample portfolio data
    this.initializePortfolioItems();
    this.initializeServices();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Portfolio methods
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItemsMap.values());
  }
  
  async getPortfolioItem(id: number): Promise<PortfolioItem | undefined> {
    return this.portfolioItemsMap.get(id);
  }
  
  async createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = this.portfolioCurrentId++;
    const portfolioItem: PortfolioItem = { ...item, id };
    this.portfolioItemsMap.set(id, portfolioItem);
    return portfolioItem;
  }
  
  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.servicesMap.values());
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.servicesMap.get(id);
  }
  
  async createService(service: InsertService): Promise<Service> {
    const id = this.serviceCurrentId++;
    const newService: Service = { ...service, id };
    this.servicesMap.set(id, newService);
    return newService;
  }
  
  // Contact form method
  async submitContactForm(form: ContactForm): Promise<boolean> {
    this.contactForms.push(form);
    return true;
  }
  
  // Initialize data
  private initializePortfolioItems() {
    const items: InsertPortfolioItem[] = [
      {
        title: "Modern Family Home",
        description: "Contemporary interior design with warm family atmosphere",
        imageUrl: "big_haz.jpg",
        category: "Residential",
        projectLink: "#"
      },
      {
        title: "Traditional Elegance",
        description: "Classic interior design with sophisticated touches",
        imageUrl: "big_okor2.jpg",
        category: "Classic",
        projectLink: "#"
      },
      {
        title: "Historic Renovation",
        description: "Transforming historic spaces with modern functionality",
        imageUrl: "big_oreglaktanya.jpg",
        category: "Renovation",
        projectLink: "#"
      },
      {
        title: "Provence Style",
        description: "French countryside charm with rustic elegance",
        imageUrl: "big_provance.en.jpg",
        category: "Rustic",
        projectLink: "#"
      },
      {
        title: "Bold Design",
        description: "Daring interior concepts with unique character",
        imageUrl: "big_vakmero3.jpg",
        category: "Contemporary",
        projectLink: "#"
      }
    ];
    
    items.forEach(item => {
      const id = this.portfolioCurrentId++;
      const portfolioItem: PortfolioItem = { ...item, id };
      this.portfolioItemsMap.set(id, portfolioItem);
    });
  }
  
  private initializeServices() {
    const serviceItems: InsertService[] = [
      {
        title: "Film Production",
        description: "Professional film production with vintage aesthetics and modern techniques.",
        icon: "video",
        features: ["Short Films", "Documentaries", "Corporate Videos", "Music Videos"]
      },
      {
        title: "Photography",
        description: "Capturing moments with a timeless vintage aesthetic.",
        icon: "camera",
        features: ["Portrait Sessions", "Product Photography", "Event Coverage", "Conceptual Art"]
      },
      {
        title: "Post-Production",
        description: "Professional editing with vintage film effects and color grading.",
        icon: "edit",
        features: ["Film Editing", "Color Grading", "Visual Effects", "Sound Design"]
      },
      {
        title: "Workshops",
        description: "Learn vintage film techniques and storytelling methods.",
        icon: "chalkboard-teacher",
        features: ["Film History", "Analog Photography", "Storytelling Techniques", "Vintage Effects"]
      }
    ];
    
    serviceItems.forEach(service => {
      const id = this.serviceCurrentId++;
      const newService: Service = { ...service, id };
      this.servicesMap.set(id, newService);
    });
  }
}

export const storage = new MemStorage();
