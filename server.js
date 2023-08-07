const express = require('express');
const cors = require('cors');
const app = express();                                   //Create an instance of the Express.js
require('dotenv').config();
const session = require('express-session');              //It enables the server to store session information for each client (user) on the server-side.
// Add express-session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
const flash = require('connect-flash');                  // Flash messages are short-lived messages that are typically used to show notifications or status messages to users after performing certain action
app.use(flash());               
const multer = require('multer');
const upload = multer();                         // Add express-flash middleware
const bcrypt = require('bcrypt');                        //s a library used for password hashing and verification. 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const { Client } = require('pg');

// Create a database connection
const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  schema: process.env.PGSCHEMA
});

// Connect to the database
client.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

app.use(cors());

// listening to port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on this port ${port}`);
})


// Serve the static build folder
// app.use(express.static(__dirname + "/build"));
// app.get('/', (req, res) => {
//   // res.send("Hello world");
//   res.sendFile(__dirname + "/build/static/js/main.7e31cccd.js");
// });




//  = = = = = = = = = = = = = Please Do Not change above code = = = = = = = = = = = = 

//  = = = = = = = = = = = = = Please Do Not change above code = = = = = = = = = = = = 

//  = = = = = = = = = = = = = Please Do Not change above code = = = = = = = = = = = = 
//  = = = = = = = = = = = = = Please Do Not change above code = = = = = = = = = = = = 

//  = = = = = = = = = = = = = Please Do Not change above code = = = = = = = = = = = = 

//  = = = = = = = = = = = = = Please Do Not change above code = = = = = = = = = = = = 














// = = = = = = = = = = A D M I N  ACCOUNT  R E G I S T R A T I O N = = = =  = = = = = = 
const checkAdminExist = async (email) =>{
  const query = 'SELECT * FROM rest.admin WHERE email = $1';
  const values= [email];

  const {rowCount} = await client.query(query, values);
  return rowCount > 0;
};

const createAdmin = async (name, phone_number, email, address, image, hashedPassword) =>{
  const query = 'INSERT INTO rest.admin (name, contact_number, email, address, image, password) VALUES($1, $2, $3, $4, $5, $6)';
  const values = [name, phone_number, email, address, image, hashedPassword];

  await client.query(query, values);
};

app.post('/adminRegister', upload.single('image'), async (req, res) =>{
  const {name, phone_number, email, address, password} = req.body;
  console.log(req.body);

  try{

    if (!name) {
      return res.status(400).send('Name is required');
    }
    const adminExists = await checkAdminExist(email);

    if(adminExists){
      res.status(400).send('Admin already exist.')
    }

    // hased the password
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.err('Error hasing password:', err);
        res.status(500).send('Internal server error');
      }

      const image = Buffer.from(req.file.buffer);
      // new admin account
      await createAdmin(name, phone_number, email, address, image,hashedPassword);
      res.status(201).send(`Received form data: name=${name}, email=${email}, phoneNumber=${phone_number}, password=${hashedPassword}`);
    });
  } catch(error){
    console.error('Error processing category form :', error);
    res.status(500).send('An error occurred while processing your request.')
  }
});











//= = = = ========= = = = = =  U S E R S    R E G I S T E R=== == == = = = = = = = =================
const checkUserExist = async (email) => {
  const query = 'SELECT * FROM rest.user WHERE email = $1'; // Updated query to use double quotes around "user"
  const values = [email];

  const { rowCount } = await client.query(query, values);
  return rowCount > 0;
};

const createUser = async (name,phone_number, email, password) => {
  const query = 'INSERT INTO rest.user (username, contact_number, email, password) VALUES ($1, $2, $3, $4)'; // Updated query to use double quotes around "user"
  const values = [name, phone_number, email, password];

  await client.query(query, values);
};

// Taking input from register form
app.post('/Register', async (req, res) => {
  const { name, phone_number, email, password } = req.body;
  // console.log(req.body);

  try {
    if (!name) {
      return res.status(400).send('Name is required');
    }

    // Check if user exists in the database
    const userExists = await checkUserExist(email);
    if (userExists) {
      return res.status(400).send('User already exists');
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.err('Error hasing password:', err);
        res.status(500).send('Internal server error');
      }
      // Create new user account
      // console.log("hasedPassword : ",hashedPassword);
      await createUser(name, phone_number, email, hashedPassword);
      res.status(200).send(`Received form data: name=${name}, email=${email}, phoneNumber=${phone_number}, password=${hashedPassword}`);
    });
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});



// fetchin user details
app.get('/Admin/Admin/users', async (req, res) => {
  try {
    const query = 'SELECT * FROM rest.user';
    const allUsers = await client.query(query);

    res.status(200).json(allUsers.rows);

  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
});







// = = = = = = = = = L O G I N  = = = = = = = = = =

// getting user info function
const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM rest.user WHERE email=$1;'
  const values = [email];

  const { rows } = await client.query(query, values);
  return rows.length > 0 ? rows[0] : null;
}

// Taking input from login form and verification
app.post('/Login', async (req, res) => {
  const { email, password } = req.body;
  console.log("from frontend",req.body);

  try {
    // getting user info
    const user = await getUserByEmail(email);
    console.log(user);

    // checking user exits or not
    if (!user) {
      req.flash('error', 'User not found')
      console.log('User not found');
      return res.status(404).json({message:'User not found'});
    }

    //verifying password
    bcrypt.compare(password, user.password, (err, results) => {
      if (err) {
        console.log('Password details',user.password);
        console.log('Error comparing password:', err);
        req.flash('error', 'Internal server error');
        return res.status(500).send('Error comparing password');
      }

      // Is verified the allow authentication
      if (results) {
        req.flash('success', 'Login Successful');
        req.session.userId = user.userid;                        // Store the userId in session
        console.log('Login Succesful');
        return res.status(200).json({message:'Login successful'});         //return json response with success property
      }
      else {
        // Password not match, authentication failed
        req.flash('error', 'Authentication Failed');
        console.log('Authentication Failed');
        return res.status(401).send('Authentication Failed');
      }
    });
  } catch (error) {
    console.error('Error:', err)
    req.flash('error', 'Internal server error')
    res.status(500).send('Internal server error');
  }
});












// = = = = =   P R O T E C T E D    R O U T E   = = =  = =  =  =

// Authentication middleware
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    req.flash('error', 'You must be logged in to access this page.');
    return res.redirect('http://localhost:3001/Login');
  }
  next();
}

// Example of using the authentication middleware for protected routes
app.get('/Reservation', requireLogin, (req, res) => {
  res.send('Welcome to the dashboard!');
});










//= = = = = = = = = = = =CONTACT ===== = = = = = = = = = = = = = =
app.post('/Contact', async (req, res) => {
  try {
    const { name, email, phone_number, enquiry, message } = req.body;
    console.log(req.body);
    const query = 'INSERT INTO rest.contact (name, email, phone_number, enquiry, message) VALUES($1, $2, $3, $4, $5)';
    const values = [name, email, phone_number, enquiry, message];

    await client.query(query, values);
    return res.status(200).json({message:'Thank you for contacting us.'})
  }
  catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).send('An error occurred while processing your request.');
  }

});






//= = = = = = = = = = = RESERVATION = = = = = = = = = = = = = 

// adding reservation
app.post('/Reservation', async (req, res) => {
  try {
    const { name, seats, phone_number, date, time } = req.body;
    console.log(req.body);
    const query = 'INSERT INTO rest.reservation (userid, name, partysize, contact_number, date, time) Values ( 5, $1, $2, $3, $4, $5)';
    const values = [name, seats, phone_number, date, time];

    await client.query(query, values);
    return res.status(200).json({message:'We recieved your seats reservation request, Happy to see you soon.'})
  }
  catch (error) {
    console.error('Error processing reservation form:', error);
    return res.status(500).json({message:'An error occurred while processing your request.'});
  }
});

// fetching data for reservation
app.get('/Admin/Admin/view-reservations', async (req, res) => {
  try {
    const query = 'SELECT * FROM rest.reservation'
    const allreservation = await client.query(query);
    res.json(allreservation.rows);
  }
  catch (error) {
    res.status(500).send('An error occurred while processing your request.');
  }
})










//= = = = = = = = = = = CATEGORIES = = = = = = = = = = = = = 

// adding category
app.post('/addcategory', upload.single('image'), async (req, res) => {
  try {
    const { category } = req.body;
    const image = Buffer.from(req.file.buffer);

    const query = 'INSERT INTO rest.category (variety, image) VALUES($1, $2)';
    const values = [category, image];

    await client.query(query, values);
    res.send(`${category} is added to the category successfully`);

  } catch (error) {
    console.error('Error processing category form :', error);
    res.status(500).send('An error occurred while processing your request.')
  }
});

// fetching data for view categories for admin
app.get('/Admin/Admin/add-category', async (req, res) => {
  try {
    const query = 'SELECT * FROM rest.category';
    const allCategories = await client.query(query);

    // convert base64 to image url
    const categoryWithUrls = allCategories.rows.map((category) => {
      const imageBuffer = category.image;
      const imageBase64 = imageBuffer.toString('base64');
      const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
      return { ...category, image: imageUrl };
    });
    res.json(categoryWithUrls);
  } catch (error) {
    console.error('Error fetching categories : ', error);
    res.status(500).send('An error occurred while processing your request.')
  }
})

// Route to handle deletion of a category by categoryid
app.delete('/Admin/Admin/delete-category/:categoryId', async (req, res) => {
  const [categoryId] = req.params;

  try {
    const deleteQuery = 'DELETE FROM rest.category WHERE categoryid = $1';
    const values = [categoryId];
    const result = await client.query.apply(deleteQuery, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    return res.status(200).json({message:'Deletion successful'})

  } catch (error) {
    console.error('Error occurred while deleting category');
    res.status(500).json({ message: 'Internal server error' });
  }

})

// fetching data for view categories for user in home page cat=category
app.get('/cat', async (req, res) => {
  try {
    const query = 'SELECT * FROM rest.category';
    const allCategories = await client.query(query);

    // convert base64 to image url
    const categoryWithUrls = allCategories.rows.map((category) => {
      const imageBuffer = category.image;
      const imageBase64 = imageBuffer.toString('base64');
      const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
      return { ...category, image: imageUrl };
    });
    res.json(categoryWithUrls);
  } catch (error) {
    console.error('Error fetching categories : ', error);
    res.status(500).send('An error occurred while processing your request.')
  }
})

// fetching data for list categories for user in menu page
app.get('/Menu/Category', async (req, res) => {
  try {
    const query = 'SELECT * FROM rest.category ORDER BY variety ASC';
    const allCategories = await client.query(query);

    // convert base64 to image url
    const categoryWithUrls = allCategories.rows.map((category) => {
      const imageBuffer = category.image;
      const imageBase64 = imageBuffer.toString('base64');
      const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
      return { ...category, image: imageUrl };
    });
    res.json(categoryWithUrls);
  } catch (error) {
    console.error('Error fetching categories : ', error);
    res.status(500).send('An error occurred while processing your request.')
  }
})

// fetching data for addmenu item select option category
app.get('/Admin/add-menu-item/getcategories', async (req, res) => {
  try {
    const query = 'SELECT * FROM rest.category ORDER BY variety ASC';
    const allCategories = await client.query(query);

    // convert base64 to image url
    const categoryWithUrls = allCategories.rows.map((category) => {
      const imageBuffer = category.image;
      const imageBase64 = imageBuffer.toString('base64');
      const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
      return { ...category, image: imageUrl };
    });
    res.json(categoryWithUrls);
  } catch (error) {
    console.error('Error fetching categories : ', error);
    res.status(500).send('An error occurred while processing your request.')
  }
})

















//= = = = = = = = = = = M E N U = = = = = = = = = = = = = 


//adding menu item
app.post('/Admin/addMenu', upload.single('image'), async (req, res) => {
  try {
    const { name, category, amount } = req.body;
    console.log("Frontend:",req.body);
    console.log('Request file:', req.file);
    const image = Buffer.from(req.file.buffer); // Convert buffer to a buffer of image data

    const query = 'INSERT INTO rest.menu(name, category, price, image) VALUES ($1, $2, $3, $4)';
    const values = [name, category, amount, image];

    await client.query(query, values);
    return res.status(200).json({message: `${name} is added to the menu successfully.`});

  } catch (error) {
    console.error('Error processing menu item form:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

// fetching data for view menu
app.get('/Admin/view-menus', async (req, res) => {
  try {
    const query = 'SELECT * FROM rest.menu';
    const allMenuItems = await client.query(query);

    // Convert Base64 encoded image strings to image URLs
    const menuItemsWithUrls = allMenuItems.rows.map((menuItem) => {
      const imageBuffer = menuItem.image; // Image data in binary format
      const imageBase64 = imageBuffer.toString('base64'); // Convert to Base64
      const imageUrl = `data:image/jpeg;base64,${imageBase64}`; // Create image URL
      return { ...menuItem, image: imageUrl };
    });

    res.status(200).json(menuItemsWithUrls);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

//fetching a single menu item using menuid
app.get('/Admin/Admin/view-menus/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // const query = 'SELECT * FROM rest.menu WHERE menuid =$1';
    // const values =[id];

    const menuitem = await client.query('SELECT * FROM rest.menu WHERE menuid =$1', [id]);
    if (!menuitem) {
      return res.status(200).send('Menu item not found');
    }
    res.json(menuitem.rows[0]);
  } catch (error) {
    res.status(500).send('An error occurred while processing your request.');
  }
})

// Route to handle deletion of a menu item by menuid
app.delete('/Admin/Admin/delete-menu/:menuId', async (req, res) => {
  const { menuId } = req.params;

  try {
    const deleteQuery = 'DELETE FROM rest.menu WHERE menuid = $1';
    const values = [menuId];
    const result = await client.query(deleteQuery, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Menu item not found' })
    }

    return res.status(200).json({message:'Deletion successful'});
  }
  catch (error) {
    console.error('Error executing delete query:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//fetching menuitem for breakfast category
app.get('/Menu/Breakfast', async (req, res) => {
  try {
    const allMenuItemBasedOnCategory = await client.query('SELECT * FROM rest.menu WHERE category = 1');

    //convert base64 encoded image to image url
    const menuItemBasedOnCategoryWithUrls = allMenuItemBasedOnCategory.rows.map((menuitem) => {
      const imageBuffer = menuitem.image;
      const imageBase64 = imageBuffer.toString('base64');
      const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
      return { ...menuitem, image: imageUrl };
    });
    res.json(menuItemBasedOnCategoryWithUrls);

  } catch (error) {
    console.error('Error fetching menu items based on Breakfast category,', error);
    res.status.apply(500).send('An error occurred while processing your request.');
  }
})

// fetching menu item on category based
app.get('/Menu/:selectedVariety', async (req, res) => {
  const { selectedVariety } = req.params;
  try {
    const getCategoryIdQuery = await client.query('SELECT category_id FROM rest.category WHERE variety = $1', [selectedVariety]);

    // checking category_id exist or not
    if (getCategoryIdQuery.rows.length === 0) {
      res.status(404).send('Category not found.');
      return;
    }

    const categoryId = getCategoryIdQuery.rows[0].category_id;

    const allMenuItemBasedOnCategory = await client.query('SELECT * FROM rest.menu WHERE category = $1', [categoryId]);

    //convert base64 encoded image to image url
    const menuItemBasedOnCategoryWithUrls = allMenuItemBasedOnCategory.rows.map((menuitem) => {
      const imageBuffer = menuitem.image;
      const imageBase64 = imageBuffer.toString('base64');
      const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
      return { ...menuitem, image: imageUrl };
    });

    res.json(menuItemBasedOnCategoryWithUrls);

  } catch (error) {
    console.error('Error fetching menu items based on category,', error);
    res.status.apply(500).send('An error occurred while processing your request.');
  }
});












app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during user logout:', err);
    }
    res.redirect('/login');
  });
});
