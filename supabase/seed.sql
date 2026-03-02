-- seed.sql

INSERT INTO products (name, slug, short_desc, description, price, compare_price, stock, category, ingredients, benefits, images, is_featured)
VALUES 
(
  'Nutrimix (Siri Dhanyada Siri)', 
  'nutrimix', 
  'A healthy mix of millets and nuts for a nutritious start to your day.', 
  'Nutrimix is a carefully crafted blend of traditional millets, nuts, and natural ingredients. It provides essential nutrients, fiber, and protein. Perfect for growing children and adults seeking a healthy lifestyle.', 
  250.00, 
  300.00, 
  100, 
  'Health Mix', 
  ARRAY['Ragi', 'Almonds', 'Cashews', 'Cardamom', 'Jaggery'], 
  ARRAY['Boosts immunity', 'High in fiber', 'Rich in natural protein'], 
  ARRAY['https://via.placeholder.com/600x600?text=Nutrimix'], 
  true
),
(
  'Ragi Chocobite', 
  'ragi-chocobite', 
  'Delicious and healthy ragi-based chocolate snacks.', 
  'Introducing Ragi Chocobite, where the goodness of finger millet (Ragi) meets the rich taste of cocoa. A guilt-free snacking option that your kids will love, without any refined sugar.', 
  150.00, 
  180.00, 
  50, 
  'Snacks', 
  ARRAY['Ragi Flour', 'Unsweetened Cocoa', 'Jaggery', 'Cold Pressed Oil'], 
  ARRAY['Calcium rich', 'No refined sugar', 'Perfect kid snack'], 
  ARRAY['https://via.placeholder.com/600x600?text=Ragi+Chocobite'], 
  true
),
(
  'Kashaya Powder', 
  'kashaya-powder', 
  'Traditional Ayurvedic immunity booster.', 
  'Our Kashaya Powder is made from a generations-old recipe using premium Indian spices. It works as a natural immunity booster, aids digestion, and brings relief during cold and cough.', 
  200.00, 
  220.00, 
  200, 
  'Wellness', 
  ARRAY['Coriander', 'Cumin', 'Black Pepper', 'Cardamom', 'Dry Ginger', 'Ashwagandha'], 
  ARRAY['Relieves cold', 'Aids digestion', 'Boosts immunity'], 
  ARRAY['https://via.placeholder.com/600x600?text=Kashaya+Powder'], 
  false
);

INSERT INTO coupons (code, discount_percent, min_cart_value, active)
VALUES ('WELCOME10', 10.00, 500.00, true);
