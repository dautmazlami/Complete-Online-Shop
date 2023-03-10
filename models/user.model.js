const bcrypt = require('bcryptjs');

const db = require('../data/database');



class User {
    constructor(email, password, fullname, street, postal, city) {
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            street: street,
            postalCode: postal,
            city: city
        };
    }

    getUserWithSameEmail() {
        return db.getDb().collection('users').findOne({ email: this.email });
    }
    
    async userExistsAlready(){
        const existingUser = await this.getUserWithSameEmail();
        if (existingUser) {
            return true;
        }
        return false;
    }

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12)
        
        await db.getDb().collection('users').insertOne({
           email: this.email,
           password: hashedPassword, // ? here the password we need to encrypt(hash) not storing like plain string
           name: this.name,
           address: this.address 
        });
    }

    hasMatchingPassword(hashedPassword){
        return bcrypt.compare(this.password, hashedPassword);
    }
};

module.exports = User;
