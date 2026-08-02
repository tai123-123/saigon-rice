export const products = [
  // ==================== ST RICE ====================
  {
    id: "st-25-premium",
    name: "ST25 Premium Rice (World's Best)",
    category: "ST Rice",
    price: 195000,
    discount: 10,
    image: "https://pos.nvncdn.com/40ed96-201888/ps/KOME-ICHIZOKU_Gao-ST25-Premium-2kg.png?v=1778310936",
    images: [
      "https://pos.nvncdn.com/40ed96-201888/ps/KOME-ICHIZOKU_Gao-ST25-Premium-2kg.png?v=1778310936",
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Awarded the title of World's Best Rice. The grains are long, clear, and perfectly shaped. When cooked, it releases a signature pandan leaf and green rice aroma. The texture is soft, chewy, and naturally sweet, even when cooled down.",
    rating: 4.9,
    reviews: [
      { id: 1, user: "Alex Johnson", rating: 5, comment: "Incredibly aromatic and soft, definitely lives up to its World's Best title!", date: "2026-07-20" },
      { id: 2, user: "Emily Smith", rating: 4.8, comment: "Our family only eats ST25 premium now. Truly outstanding quality.", date: "2026-07-15" }
    ],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Soft",
    origin: "Soc Trang, Vietnam",
    riceType: "Premium Long Grain",
    packaging: "Premium vacuum bag (sealed fresh for 12 months)",
    cookingRecommendation: "Recommended rice-to-water ratio is 1:1. Do not rinse too many times to retain the nutritious outer bran layer.",
    nutrition: {
      calories: "348 kcal",
      protein: "7.5g",
      carbs: "78.2g",
      fat: "0.6g",
      fiber: "1.2g"
    }
  },
  {
    id: "st-25-organic",
    name: "ST25 Organic Rice",
    category: "ST Rice",
    price: 280000,
    discount: 15,
    image: "https://i.ytimg.com/vi/xJEXuy_Y6zw/maxresdefault.jpg",
    images: [
      "https://i.ytimg.com/vi/xJEXuy_Y6zw/maxresdefault.jpg",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Grown under strict USDA organic standards in the specialized Rice-Shrimp rotation fields of Soc Trang. Free of chemical fertilizers and synthetic pesticides, yielding a deeper natural sweet taste.",
    rating: 5.0,
    reviews: [
      { id: 1, user: "Robert D.", rating: 5, comment: "Pure, delicious, and healthy. Worth every single penny.", date: "2026-07-28" }
    ],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Aromatic",
    origin: "Soc Trang Ecological Zone, Vietnam",
    riceType: "Organic Aromatic Specialty",
    packaging: "Eco-friendly Kraft box with internal vacuum seal",
    cookingRecommendation: "Recommended rice-to-water ratio is 1:1.05. Let it steam for 15 minutes after cooking completes before opening.",
    nutrition: {
      calories: "352 kcal",
      protein: "7.8g",
      carbs: "77.5g",
      fat: "0.8g",
      fiber: "1.6g"
    }
  },
  {
    id: "st-24-dac-san",
    name: "ST24 Specialty Rice",
    category: "ST Rice",
    price: 160000,
    discount: 0,
    image: "https://riceandmore.vn/wp-content/uploads/2022/11/vietnam-jasmine-rice.jpg",
    images: [
      "https://riceandmore.vn/wp-content/uploads/2022/11/vietnam-jasmine-rice.jpg"
    ],
    description: "Ranked in the Top 3 World's Best Rice at Macau. Slender long grain that cooks into soft, sticky, and glossy white rice. Stays soft and delicious even when cold.",
    rating: 4.8,
    reviews: [
      { id: 1, user: "Daniel K.", rating: 4.7, comment: "Very soft and fresh. The packaging was immaculate.", date: "2026-07-10" }
    ],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Soft",
    origin: "Soc Trang, Vietnam",
    riceType: "Soft Long Grain",
    packaging: "Premium woven PP bag",
    cookingRecommendation: "Recommended rice-to-water ratio is 1:1. Cooks quickly, stays soft all day.",
    nutrition: {
      calories: "346 kcal",
      protein: "7.2g",
      carbs: "79.0g",
      fat: "0.5g",
      fiber: "1.0g"
    }
  },
  {
    id: "st-21-thom-ngot",
    name: "ST21 Aromatic Rice",
    category: "ST Rice",
    price: 135000,
    discount: 5,
    image: "https://shop.annam-gourmet.com/pub/media/catalog/product/cache/a75222ce7edda842b603082f8eb93d02/i/t/item_F168074_a06b.png",
    images: [
      "https://shop.annam-gourmet.com/pub/media/catalog/product/cache/a75222ce7edda842b603082f8eb93d02/i/t/item_F168074_a06b.png"
    ],
    description: "Bred from high-quality ST lineages, ST21 offers high elasticity, sweet taste, and a gentle floral scent. Perfect for everyday family dinners.",
    rating: 4.6,
    reviews: [],
    stockStatus: "In Stock",
    bagSize: "10kg",
    tasteProfile: "Soft",
    origin: "Soc Trang, Vietnam",
    riceType: "Soft Aromatic Grain",
    packaging: "Heavy-duty 10kg carry bag",
    cookingRecommendation: "Recommended rice-to-water ratio is 1:1.1. Rinse twice and cook normally.",
    nutrition: {
      calories: "345 kcal",
      protein: "7.0g",
      carbs: "79.5g",
      fat: "0.4g",
      fiber: "0.9g"
    }
  },
  {
    id: "st-25-mam-gaba",
    name: "ST25 GABA Germinated Rice",
    category: "ST Rice",
    price: 240000,
    discount: 8,
    image: "https://tse1.mm.bing.net/th/id/OIP.zYFBi1gY3s0ImbDbYFdM8QHaKl?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    images: [
      "https://tse1.mm.bing.net/th/id/OIP.zYFBi1gY3s0ImbDbYFdM8QHaKl?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    ],
    description: "Germinated from golden ST25 paddy to activate GABA compound (great for the nervous system, supports sleep and regulates blood pressure). Fluffy, delicious, and highly nutritious.",
    rating: 4.9,
    reviews: [
      { id: 1, user: "Dr. Richard", rating: 5, comment: "Highly recommended for diabetic or hypertensive patients. Delicious and easy to chew.", date: "2026-07-29" }
    ],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Fluffy",
    origin: "Mekong Delta, Vietnam",
    riceType: "Nutritious Germinated Rice",
    packaging: "Vacuum box with convenient single-portion packs",
    cookingRecommendation: "Recommended rice-to-water ratio is 1:1.2. Soak in warm water for 15-20 minutes before cooking to maximize GABA activation.",
    nutrition: {
      calories: "360 kcal",
      protein: "8.5g",
      carbs: "75.0g",
      fat: "1.5g",
      fiber: "3.5g"
    }
  },

  // ==================== JASMINE RICE ====================
  {
    id: "jasmine-hoang-gia",
    name: "Royal Jasmine Rice",
    category: "Jasmine Rice",
    price: 120000,
    discount: 5,
    image: "https://tse2.mm.bing.net/th/id/OIP.i27-5JMqyGePLkAySAqaWgHaJN?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    images: [
      "https://tse2.mm.bing.net/th/id/OIP.i27-5JMqyGePLkAySAqaWgHaJN?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    ],
    description: "Premium export-grade jasmine rice. Slender, glossy white grains. When cooked, it becomes soft, sticky, and releases a refreshing sweet jasmine flower fragrance.",
    rating: 4.7,
    reviews: [],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Aromatic",
    origin: "An Giang, Vietnam",
    riceType: "Specialty Jasmine Rice",
    packaging: "Elegantly styled PE bag",
    cookingRecommendation: "Recommended rice-to-water ratio is 1:1.15. Fluff gently before serving.",
    nutrition: {
      calories: "349 kcal",
      protein: "6.8g",
      carbs: "80.1g",
      fat: "0.4g",
      fiber: "0.8g"
    }
  },
  {
    id: "jasmine-organic-an-giang",
    name: "Organic An Giang Jasmine Rice",
    category: "Jasmine Rice",
    price: 185000,
    discount: 10,
    image: "https://tse1.mm.bing.net/th/id/OIP.A0siR19R1J5pchNm7NPF1wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    images: [
      "https://tse1.mm.bing.net/th/id/OIP.A0siR19R1J5pchNm7NPF1wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    ],
    description: "Grown organically in the rich alluvial soils of the upper Mekong River. Naturally sweet and clean, chemical-free, bringing home traditional delta flavor.",
    rating: 4.9,
    reviews: [
      { id: 1, user: "Sarah T.", rating: 5, comment: "The mild jasmine aroma is very authentic. Highly recommend.", date: "2026-07-22" }
    ],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Aromatic",
    origin: "An Giang, Vietnam",
    riceType: "Organic Jasmine Rice",
    packaging: "Premium recycled paper box, protecting environment",
    cookingRecommendation: "Recommended rice-to-water ratio is 1:1.1. Dry the cooker inner pot before starting to keep full aroma.",
    nutrition: {
      calories: "350 kcal",
      protein: "7.0g",
      carbs: "78.9g",
      fat: "0.6g",
      fiber: "1.1g"
    }
  },
  {
    id: "jasmine-sua-dong-thap",
    name: "Milky Jasmine Rice",
    category: "Jasmine Rice",
    price: 110000,
    discount: 0,
    image: "https://ricedelivery.ph/cdn/shop/files/JasmineRice_360x.png?v=1712973618",
    images: [
      "https://ricedelivery.ph/cdn/shop/files/JasmineRice_360x.png?v=1712973618"
    ],
    description: "Grains are milky white due to a rich outer rice bran coating. When cooked, it has high stickiness, buttery undertones, and a rustic delta profile.",
    rating: 4.5,
    reviews: [],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Sticky",
    origin: "Dong Thap, Vietnam",
    riceType: "Milky Sticky Jasmine",
    packaging: "Durable vacuum-sealed plastic bag",
    cookingRecommendation: "Recommended rice-to-water ratio is 1:1. Requires less water since grains soften rapidly.",
    nutrition: {
      calories: "347 kcal",
      protein: "6.9g",
      carbs: "79.8g",
      fat: "0.5g",
      fiber: "0.9g"
    }
  },
  {
    id: "jasmine-campuchia-nhap-khau",
    name: "Imported Cambodian Jasmine Rice",
    category: "Jasmine Rice",
    price: 170000,
    discount: 5,
    image: "https://images.healthshots.com/healthshots/en/uploads/2024/03/29153630/best-basmati-rice-in-India-3.jpg",
    images: [
      "https://images.healthshots.com/healthshots/en/uploads/2024/03/29153630/best-basmati-rice-in-India-3.jpg"
    ],
    description: "Imported directly from pristine clean borders. The grains are firm and long, cooking into an extremely chewy and satisfying texture.",
    rating: 4.8,
    reviews: [
      { id: 1, user: "Kim V.", rating: 5, comment: "Exceptional quality, holds shape perfectly while staying soft.", date: "2026-07-25" }
    ],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Soft",
    origin: "Cambodia (Imported)",
    riceType: "Imported Specialty Jasmine",
    packaging: "Dual-layer woven sack",
    cookingRecommendation: "Recommended rice-to-water ratio is 1:1.15. Ideal for claypot rice.",
    nutrition: {
      calories: "351 kcal",
      protein: "7.1g",
      carbs: "79.2g",
      fat: "0.5g",
      fiber: "1.0g"
    }
  },
  {
    id: "jasmine-ngoc-troi",
    name: "Ngoc Troi Sparkling Jasmine",
    category: "Jasmine Rice",
    price: 210000,
    discount: 12,
    image: "https://thienhau.vn/wp-content/uploads/2020/10/gao-hat-ngoc-troi-phuong-hoang-5kg.png",
    images: [
      "https://thienhau.vn/wp-content/uploads/2020/10/gao-hat-ngoc-troi-phuong-hoang-5kg.png"
    ],
    description: "Certified with international SRP standards for clean sustainable rice cultivation. Fluffy, glossy, with a balanced stickiness.",
    rating: 4.8,
    reviews: [],
    stockStatus: "Out of Stock",
    bagSize: "10kg",
    tasteProfile: "Fluffy",
    origin: "Mekong Delta, Vietnam",
    riceType: "SRP Export-Grade Jasmine",
    packaging: "Heavy export-ready 10kg bag",
    cookingRecommendation: "Recommended rice-to-water ratio is 1:1.1. Good choice for large families.",
    nutrition: {
      calories: "348 kcal",
      protein: "6.7g",
      carbs: "80.4g",
      fat: "0.3g",
      fiber: "0.7g"
    }
  },

  // ==================== BROWN RICE ====================
  {
    id: "lut-do-dien-bien",
    name: "Red upland Brown Rice",
    category: "Brown Rice",
    price: 145000,
    discount: 10,
    image: "https://miro.medium.com/v2/resize:fit:1024/0*pC4VGXT-Q7zn4a7B.jpg",
    images: [
      "https://miro.medium.com/v2/resize:fit:1024/0*pC4VGXT-Q7zn4a7B.jpg"
    ],
    description: "Famous Northwest red highland brown rice. Soft, sticky grain with rich iron, calcium, and dietary fiber content. Supports heart health and weight loss.",
    rating: 4.8,
    reviews: [
      { id: 1, user: "Vivian N.", rating: 5, comment: "Extremely soft for brown rice! Usually brown rice is very tough, but this one is wonderful.", date: "2026-07-27" }
    ],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Sticky",
    origin: "Dien Bien, Vietnam",
    riceType: "Upland Red Brown Rice",
    packaging: "Vacuum box (neatly shaped)",
    cookingRecommendation: "No need to soak. Recommended rice-to-water ratio is 1:1.25.",
    nutrition: {
      calories: "365 kcal",
      protein: "8.2g",
      carbs: "74.8g",
      fat: "2.4g",
      fiber: "4.5g"
    }
  },
  {
    id: "lut-den-phuc-tho",
    name: "Black Royal Brown Rice",
    category: "Brown Rice",
    price: 175000,
    discount: 15,
    image: "https://5.imimg.com/data5/SELLER/Default/2023/3/VK/DY/HY/184717727/organic-black-rice-1000x1000.jpg",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/3/VK/DY/HY/184717727/organic-black-rice-1000x1000.jpg"
    ],
    description: "Traditional black brown rice, highly rich in Anthocyanin antioxidants. Yields a deep purple color when cooked, with a nutty, satisfying sweet bite.",
    rating: 4.9,
    reviews: [
      { id: 1, user: "Kevin L.", rating: 5, comment: "Tastes nutty and rich. Fits my clean eating diet perfectly.", date: "2026-07-29" }
    ],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Soft",
    origin: "Thanh Hoa, Vietnam",
    riceType: "Premium Black Brown Rice",
    packaging: "Eco Kraft box vacuum-sealed inside",
    cookingRecommendation: "Soak in clean water for 30 minutes before cooking. Recommended ratio is 1:1.3.",
    nutrition: {
      calories: "370 kcal",
      protein: "9.0g",
      carbs: "73.2g",
      fat: "2.8g",
      fiber: "5.2g"
    }
  },
  {
    id: "lut-huyet-rong-tay-nam-bo",
    name: "Dragon-Blood Brown Rice",
    category: "Brown Rice",
    price: 130000,
    discount: 0,
    image: "https://img2.tradewheel.com/uploads/images/products/3/5/0445004001669551062-vietnam-dragon-blood.jpeg.webp",
    images: [
      "https://img2.tradewheel.com/uploads/images/products/3/5/0445004001669551062-vietnam-dragon-blood.jpeg.webp"
    ],
    description: "Cultivated in wild floodwaters. Contains rich Vitamin B complexes to restore physical strength and stamina.",
    rating: 4.5,
    reviews: [],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Fluffy",
    origin: "Mekong Delta, Vietnam",
    riceType: "Traditional Red Yeast Rice",
    packaging: "Durable vacuum pouch",
    cookingRecommendation: "Soak for 4 to 6 hours to soften before cooking. Recommended ratio is 1:1.5.",
    nutrition: {
      calories: "362 kcal",
      protein: "8.0g",
      carbs: "75.5g",
      fat: "2.2g",
      fiber: "4.0g"
    }
  },
  {
    id: "lut-nuong-son-la",
    name: "Son La Mountain Brown Rice",
    category: "Brown Rice",
    price: 160000,
    discount: 5,
    image: "https://phunuvietnam.mediacdn.vn/thumb_w/1098/179072216278405120/2025/8/7/lua-3-17544925859601754349672-230-0-1510-2048-crop-1754536645946340625135.jpg",
    images: [
      "https://phunuvietnam.mediacdn.vn/thumb_w/1098/179072216278405120/2025/8/7/lua-3-17544925859601754349672-230-0-1510-2048-crop-1754536645946340625135.jpg"
    ],
    description: "Harvested manually on upland terraces of Son La. Nourished only by natural rainwater, concentrating rich mountain minerals and fiber.",
    rating: 4.7,
    reviews: [],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Fluffy",
    origin: "Son La, Vietnam",
    riceType: "Upland Terrace Brown Rice",
    packaging: "Biodegradable paper bag",
    cookingRecommendation: "Soak for 1 hour. Recommended ratio is 1:1.3. Chewy texture with a sweet coconut milk-like finish.",
    nutrition: {
      calories: "358 kcal",
      protein: "7.9g",
      carbs: "76.0g",
      fat: "1.9g",
      fiber: "3.8g"
    }
  },
  {
    id: "lut-te-organic",
    name: "Organic Brown Jasmine Rice",
    category: "Brown Rice",
    price: 155000,
    discount: 8,
    image: "https://i5.walmartimages.com/seo/Golden-Star-Organic-Jasmine-Brown-Rice-Ready-to-Heat-Microwaveable-Pouch-8-5-oz_edfd9a2a-4a9e-48af-af76-5a65128ce37b.2de76160af70bcbe922378342464d3d4.jpeg",
    images: [
      "https://i5.walmartimages.com/seo/Golden-Star-Organic-Jasmine-Brown-Rice-Ready-to-Heat-Microwaveable-Pouch-8-5-oz_edfd9a2a-4a9e-48af-af76-5a65128ce37b.2de76160af70bcbe922378342464d3d4.jpeg"
    ],
    description: "Partially milled jasmine rice that retains its full nutritional inner bran. The cooked rice is much softer and easier to digest than standard brown rice.",
    rating: 4.8,
    reviews: [
      { id: 1, user: "Mary P.", rating: 5, comment: "Easiest brown rice to chew. Very mild flavor, not overly coarse.", date: "2026-07-18" }
    ],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Soft",
    origin: "Can Tho, Vietnam",
    riceType: "Semi-polished Jasmine Brown",
    packaging: "Modern vacuum PP bag",
    cookingRecommendation: "Recommended ratio is 1:1.2. Perfect for beginners to clean eating diets.",
    nutrition: {
      calories: "355 kcal",
      protein: "7.5g",
      carbs: "77.0g",
      fat: "1.5g",
      fiber: "2.8g"
    }
  },

  // ==================== STICKY RICE ====================
  {
    id: "nep-cai-hoa-vang-vip",
    name: "Golden Flower Sticky Rice",
    category: "Sticky Rice",
    price: 150000,
    discount: 10,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Classic Red River delta sticky rice. Round, plump milky white grains. Cooked rice has intense stickiness and binding power, perfect for traditional cakes.",
    rating: 4.9,
    reviews: [
      { id: 1, user: "Grandma Vy", rating: 5, comment: "Plump sticky rice, holds form and soft texture for days.", date: "2026-07-28" }
    ],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Sticky",
    origin: "Bac Ninh, Vietnam",
    riceType: "Premium Sticky Glutinous Rice",
    packaging: "Vacuum bag protecting against humidity",
    cookingRecommendation: "Soak for 4 to 6 hours before steaming. Drizzle with a bit of oil or fat for a glossy finish.",
    nutrition: {
      calories: "368 kcal",
      protein: "6.5g",
      carbs: "81.2g",
      fat: "0.6g",
      fiber: "0.6g"
    }
  },
  {
    id: "nep-tu-le-dac-san",
    name: "Tu Le Upland Sticky Rice",
    category: "Sticky Rice",
    price: 220000,
    discount: 5,
    image: "https://thewoksoflife.com/wp-content/uploads/2019/04/how-to-make-sticky-rice-7.jpg",
    images: [
      "https://thewoksoflife.com/wp-content/uploads/2019/04/how-to-make-sticky-rice-7.jpg"
    ],
    description: "Treasured upland sticky rice grown in the famous Tu Le valley. Cooked rice carries an intense forest aroma, and is highly buttery and sweet.",
    rating: 5.0,
    reviews: [
      { id: 1, user: "Hannah W.", rating: 5, comment: "Unbeatable fragrance, stays moist and sticky forever. Truly special.", date: "2026-07-26" }
    ],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Sticky",
    origin: "Yen Bai, Vietnam",
    riceType: "Premium Mountain Sticky Rice",
    packaging: "Luxury giftbox presentation",
    cookingRecommendation: "Soak for 6 to 8 hours. Steam twice to maintain peak soft texture for up to two days.",
    nutrition: {
      calories: "372 kcal",
      protein: "6.8g",
      carbs: "80.5g",
      fat: "0.8g",
      fiber: "1.0g"
    }
  },
  {
    id: "nep-sap-ba-tri",
    name: "Ba Tri Sweet Sticky Rice",
    category: "Sticky Rice",
    price: 110000,
    discount: 0,
    image: "https://cf.shopee.vn/file/vn-11134201-23020-2x6ay6xmj3nv81",
    images: [
      "https://cf.shopee.vn/file/vn-11134201-23020-2x6ay6xmj3nv81"
    ],
    description: "Highly cohesive Southern sticky rice, yielding rich coconut-sweet profile. Ideal for wrapping traditional leaf cakes.",
    rating: 4.6,
    reviews: [],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Sticky",
    origin: "Ben Tre, Vietnam",
    riceType: "Glossy Sweet Glutinous",
    packaging: "Sealed thick PE bag",
    cookingRecommendation: "Add a pinch of salt and steam. Pairs excellently with coconut cream toppings.",
    nutrition: {
      calories: "364 kcal",
      protein: "6.2g",
      carbs: "81.0g",
      fat: "0.5g",
      fiber: "0.7g"
    }
  },
  {
    id: "nep-cam-dien-bien",
    name: "Dien Bien Purple Sticky Rice",
    category: "Sticky Rice",
    price: 165000,
    discount: 10,
    image: "https://fullofplants.com/wp-content/uploads/2025/03/how-to-cook-purple-sticky-rice-thumb.jpg",
    images: [
      "https://fullofplants.com/wp-content/uploads/2025/03/how-to-cook-purple-sticky-rice-thumb.jpg"
    ],
    description: "Dien Bien purple sticky rice, yielding dark wine-colored sweet grains. Widely used to prepare probiotic purple rice yogurt or fermented sweet rice wines.",
    rating: 4.9,
    reviews: [
      { id: 1, user: "Jessica K.", rating: 5, comment: "Perfect for making purple rice yogurt, super chewy and nutty.", date: "2026-07-30" }
    ],
    stockStatus: "In Stock",
    bagSize: "5kg",
    tasteProfile: "Sticky",
    origin: "Dien Bien, Vietnam",
    riceType: "Nutritious Purple Sticky",
    packaging: "Vacuum-sealed bag protecting nutrient profiles",
    cookingRecommendation: "Soak for 6 hours. Steam or ferment. Unmatched visual presentation and chew.",
    nutrition: {
      calories: "375 kcal",
      protein: "7.2g",
      carbs: "74.5g",
      fat: "3.0g",
      fiber: "3.2g"
    }
  },
  {
    id: "nep-ngong-dap-san",
    name: "Mekong Giant Sticky Rice",
    category: "Sticky Rice",
    price: 125000,
    discount: 5,
    image: "https://luongthuc.org/wp-content/uploads/2022/11/Gao-nep-Tu-Le-dac-san-Yen-Bai.jpg",
    images: [
      "https://luongthuc.org/wp-content/uploads/2022/11/Gao-nep-Tu-Le-dac-san-Yen-Bai.jpg"
    ],
    description: "Traditional large sticky rice grains from Mekong delta. Cooked rice is soft, airy, and does not clump or dry out when cooled down.",
    rating: 4.7,
    reviews: [],
    stockStatus: "In Stock",
    bagSize: "10kg",
    tasteProfile: "Sticky",
    origin: "Long An, Vietnam",
    riceType: "Large Grain Sticky Rice",
    packaging: "Convenient 10kg carry sack",
    cookingRecommendation: "Soak for 4 to 5 hours then steam. Excellent for street food sticky rice desserts.",
    nutrition: {
      calories: "366 kcal",
      protein: "6.4g",
      carbs: "81.1g",
      fat: "0.5g",
      fiber: "0.8g"
    }
  }
];
