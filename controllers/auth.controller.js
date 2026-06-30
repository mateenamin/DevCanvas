import User from "../models/User.model.js";
import bcrypt from 'bcryptjs'; // 1. Bcrypt import kiya
import jwt from 'jsonwebtoken'; // 1. Sab se upar import karein

export const signUser = async (req , res) => {

    try {

        const { name , email , password } = req.body  // 1. Data pakra

     //   Matlab: Isay JavaScript me Destructuring kehte hain. User ne Postman ya Frontend se jo data bheja, woh req.body me aaya. Humne usme se teen cheezein (name, email, password) nikaal kar alag variables me rakh leen.


        // 2. Check kiya ke email pehle se hai ya nahi
        const userEmail = await User.findOne({email});
        if(userEmail) {
         return res.status(400).json({
           message: "Your email is already registered!"
         });
        }


  //  Matlab:

        //  User.findOne({ email }): Hum apne Model ko keh rahe hain: "Database me jaao aur dhoondo ke kya pehle se is email ka koi user maujood hai?"

        //    await: Kyunki database me dhoondne me waqt lagega, await line ko tab tak rok kar rakhega jab tak MongoDB se jawab nahi aa jata.    


    //    Matlab: Agar database me woh email pehle se mil gayi (userExists true ho gaya), tu hum yahin se return (wapas) ho jayenge. Agay ka code nahi chalega. Hum user ko status 400 (Bad Request) aur error message bhej denge.
      
    
    // 5. Password ko hash kiya (10 salt rounds ke sath)

       // 1. Aik khufia random string (Salt) generate ki takay password mazeed secure ho
const salt = await bcrypt.genSalt(10);
            // 10 = Salt Rounds (Processing speed aur security ka balance)
// 2. Asli password aur salt ko mix kar ke unique encrypted password (Hash) banaya
const hashedPassword = await bcrypt.hash(password, salt);  
    
    // 3. Naya user create kiya
        const newUser = await User.create({
             name ,email , password: hashedPassword
        });

         res.status(201).json({
            message : "User successfully registered",
            user: {
                id : newUser._id,
                name: newUser.name,
                email: newUser.email
            }
         });

       //  Matlab: Hum user ko status 201 (Created) bhej rahe hain, jiska matlab hai data kamyabi se save ho gaya. Jawab me hum message bhej rahe hain aur suraksha (security) ke liye sirf user ki id, name, aur email wapas bhej rahe hain (password wapas nahi bhejte)
    }

   catch (err) {
  res.status(500).json({
    message: "Server Error",
    error: err.message
  });
}
   
          //   Matlab: Agar try ke andar koi bhi galti hui (jaise database down ho gaya ya internet chala gaya), tu code seedha yahan aayega. Hum status 500 (Internal Server Error) bhejenge aur error ka message dikha denge taake hamein pata chal sakay ke code me kya masla hua.


        
}




export const loginUser = async (req , res ) =>{
   

 try {
            const { email , password } = req.body  // 1. User se email aur password pakra

                       // 2. Email se user ko database me dhoonda
            const user = await User.findOne({ email});
                      console.log(user);
            if(!user){
              return res.status(400).json({
                message : "Invalid Email ya Password!"
              })
            }

            // 3. Password check kiya (jo password user ne likha + jo DB me hashed save hai)
            //                      (Plain Text,   Hashed Text)
            const isMatch = await bcrypt.compare(password , user.password);
               console.log(isMatch);
//             password: Yeh woh plain password hai jo user ne abhi Login form/Postman me likha (e.g., "123456").

//             user.password: Yeh database se aaya hua encrypted password hai.

//     Bcrypt khud pichay se is plain password ko uthata hai, use dobara hash karta hai, 
// aur database wale user.password se match karta hai. Hamein login me alag se hashedPassword
// ka variable banane ki zaroorat nahi parti.

            if(!isMatch){
              return res.status(400).json({
                message: "Invalid Email ya Password!"
              })
            }


            // 2. JWT TOKEN BANAYA
            // jwt.sign() = User ID aur secret key ko mila kar ek secure token (pass) banata hai
        const token = jwt.sign(
            { id: user._id }, // Payload (User ki pehchan)
            process.env.JWT_SECRET, // Khufia chabi
            { expiresIn: process.env.JWT_EXPIRE } // Expiry (7 din)
        );

            // 4. Agar sab sahi hai tu response bhej diya

            res.status(200).json({
              message: "Login successful!",
              token,
              user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
            })
 }
 catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }

}




// Ab humare paas login karne par user ka data toh aa raha hai, 
// lekin abhi ek bohot bara masla hai.

// Masla Kya Hai?

// Abhi jab user login karta hai, toh hum use sirf message bhej dete hain:
// "Login successful!". Lekin jab woh frontend par kisi doosre page par jayega 
// (jaise /dashboard ya /profile), toh hamare backend ko kaise pata chalega ke yeh wahi 
// banda hai jo abhi login kar ke aaya hai? HTTP stateless hota hai, woh har request ko ek 
// naya naya mehmaan samajhta hai.


// Hal (Solution): JWT (JSON Web Token)
// Hamein login ke waqt user ko ek khufia pass/token dena parega. 
// Jab bhi user koi naya page kholega, woh yeh pass backend ko dikhayega, 
// aur backend use entry de dega.