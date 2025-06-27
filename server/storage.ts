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
    const portfolioItem: PortfolioItem = { 
      ...item, 
      id,
      additionalImages: item.additionalImages || null,
      projectLink: item.projectLink || null
    };
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
        title: "Commercial building with attic and apartment design",
        description: "Contemporary interior design with warm family atmosphere",
        imageUrl: "/static/big_haz.jpg",
        additionalImages: null,
        category: "Residential",
        projectLink: "#"
      },
      {
        title: "Ancient design",
        description: "Classic interior design with sophisticated touches",
        imageUrl: "/static/big_okor2.jpg",
        additionalImages: null,
        category: "Classic",
        projectLink: "#"
      },
      {
        title: "Historic Renovation",
        description: "Transforming historic spaces with modern functionality",
        imageUrl: "/static/big_oreglaktanya.jpg",
        additionalImages: null,
        category: "Renovation",
        projectLink: "#"
      },
      {
        title: "Provence Style",
        description: "French countryside charm with rustic elegance",
        imageUrl: "/static/big_provance.en.jpg",
        additionalImages: [
          "/static/big_myaraloterasz.jpg.jpg",
          "/static/big_nyaralo2.jpg",
          "/static/big_nyaralokert.jpg",
          "/static/big_nyaralonappali.jpg"
        ],
        category: "Rustic",
        projectLink: "#"
      },
      {
        title: "Bold Design",
        description: "Daring interior concepts with unique character",
        imageUrl: "/static/big_vakmero4.jpg",
        additionalImages: [
          "/static/big_nappali2.jpg",
          "/static/big_nappali3.jpg", 
          "/static/big_nappali4.jpg",
          "/static/big_nappali6.jpg",
          "/static/big_napteto.jpg",
          "/static/big_rfurdo.jpg",
          "/static/big_rkonyha.jpg"
        ],
        category: "Contemporary",
        projectLink: "#"
      },
      {
        title: "Plans",
        description: "Architectural plans and design concepts",
        imageUrl: "/static/big_nappali_falnezet2.jpg",
        additionalImages: [
          "/static/big_emeletalaprajz.jpg",
          "/static/big_emelethalo_falnezet.jpg",
          "/static/big_fodszintialaprajz.jpg",
          "/static/big_furdo.jpg",
          "/static/big_halo_falnezet.jpg",
          "/static/big_halo.jpg",
          "/static/big_konyha.jpg",
          "/static/big_nappali_falnezet.jpg",
          "/static/big_nappali_falnezet2.jpg",
          "/static/big_nappali_falnezet3.jpg",
          "/static/big_nappali.jpg",
          "/static/big_furdo_montazs.jpg",
          "/static/big_halo_montazs.jpg.jpg",
          "/static/big_konyhamontazs.jpg.jpg",
          "/static/big_nappali_montazs.jpg"
        ],
        category: "Tervek",
        projectLink: "#"
      },
      {
        title: "Publications",
        description: "Publications",
        imageUrl: "/static/big_otthon2.jpg",
        additionalImages: [
          "/static/big_otthonnap2.jpg",
          "/static/big_otthonnap.jpg",
          "/static/big_otthonfurdo.jpg"
        ],
        category: "publikációk",
        projectLink: "#"
      }
    ];
    
    items.forEach(item => {
      const id = this.portfolioCurrentId++;
      const portfolioItem: PortfolioItem = { 
        ...item, 
        id,
        additionalImages: item.additionalImages || null,
        projectLink: item.projectLink || null
      };
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
