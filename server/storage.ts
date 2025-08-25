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
        title: "Studió lakás",
        description: "luxus és kényelem 27m2-en",
        imageUrl: "/static/studio1.jpg",
        additionalImages: [
          "/static/studio2.jpg",
          "/static/studio3.jpg",
          "/static/studio4.jpg",
          "/static/studio5.jpg",
          "/static/studio6.jpg",
          "/static/studio7.jpg",
          "/static/studio8.jpg",
          "/static/studio9.jpg",
          "/static/studio10.jpg",
          "/static/studio11.jpg",
          "/static/studio12.jpg",
          "/static/studio13.jpg",
          "/static/studio14.jpg",
          "/static/studio15.jpg",
          "/static/studio16.jpg",
          "/static/studio17.jpg",
          "/static/studio18.jpg"
        ],
        category: "Residential",
        projectLink: "#"
      },
      {
        title: "Indusztrális legénylakás",
        description: "Retro, ipari stilus a funkcionalitás jegyében",
        imageUrl: "/static/indusztrial.JPEG",
        additionalImages: [
          "/static/indusztrial1.JPEG",
          "/static/indusztrial2.JPG",
          "/static/indusztrial3.JPG",
          "/static/indusztrial4.JPG",
          "/static/indusztrial5.JPG",
          "/static/indusztrial6.JPG",
          "/static/indusztrial7.JPG",
          "/static/indusztrial8.JPG",
          "/static/indusztrial9.jpg",
          "/static/indusztrial10.JPG",
          "/static/indusztrial11.JPG",
          "/static/indusztrial12.JPG",
          "/static/indusztrial14.JPG",
          "/static/indusztrial15.JPG",
          "/static/indusztrial16 (2).JPG",
          "/static/indusztrial16 (3).jpg",
          "/static/indusztrial16 (4).JPG",
          "/static/indusztrial16 (5).JPG",
          "/static/indusztrial16 (6).JPG",
          "/static/indusztrial16.jpg",
          "/static/indusztrial17.JPG",
          "/static/indusztrial19.JPG",
          "/static/indusztrial20.JPG",
          "/static/indusztrial21.JPG"
        ],
        category: "Industrial",
        projectLink: "#"
      },
      {
        title: "Historic Renovation",
        description: "Transforming historic spaces with modern functionality",
        imageUrl: "/static/big_laktanya.jpg",
        additionalImages: [
          "/static/big_furdo2.jpg"
        ],
        category: "Renovation",
        projectLink: "#"
      },
      {
        title: "Bold Design",
        description: "Daring interior concepts with unique character",
        imageUrl: "/static/big_nappali2.jpg",
        additionalImages: [
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
        title: "Provence Style",
        description: "French countryside charm with rustic elegance",
        imageUrl: "/static/big_myaraloterasz.jpg.jpg",
        additionalImages: [
          "/static/big_nyaralo2.jpg",
          "/static/big_nyaralokert.jpg",
          "/static/big_nyaralonappali.jpg"
        ],
        category: "Rustic",
        projectLink: "#"
      },
      {
        title: "Commercial building with attic and apartment design",
        description: "Contemporary interior design with warm family atmosphere",
        imageUrl: "/static/big_haz.jpg",
        additionalImages: null,
        category: "Residential",
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
        title: "Design",
        description: "Professional interior design services with personalized concepts and solutions.",
        icon: "drafting-compass",
        features: ["Space Planning", "Color Schemes", "Furniture Selection", "Custom Solutions"]
      },
      {
        title: "Construction",
        description: "Quality construction and renovation services for residential and commercial spaces.",
        icon: "hammer",
        features: ["Home Renovation", "Kitchen Remodeling", "Bathroom Design", "Custom Building"]
      },
      {
        title: "Consulting",
        description: "Expert consultation for design decisions and project planning.",
        icon: "lightbulb",
        features: ["Design Consultation", "Project Planning", "Material Selection", "Budget Planning"]
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
