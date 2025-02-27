"use client";
import React, { useState, useRef } from "react";
import styles from "./profileCreation.module.css";
import Profile from "./profile"
import Image from "next/image";
import Link from "next/link"
import "react-image-crop/dist/ReactCrop.css";

const createProfile = () => {
  
    return (



        
        <div className={styles.signup}>
        <nav className={styles.navbar}>
        <div className={styles.logocontainer}>
          <Image src="/company-logo.png" alt="Company Logo" width={35} height={35} />
          <div className={styles.logo}>LUXORA</div>
        </div>
        <ul className={styles.navlinks}>
          <li><Link href="./">Home</Link></li>
          <li><Link href="/Shop">Shop</Link></li>
          <li><Link href="#">About</Link></li>
          <li><Link href="#">Contact</Link></li>
        </ul>
        <div className={styles.searchbar}>
          <input type="text" placeholder="Search products..." />
          <button className={styles.searchbutton}>
            <Image src="/maginifying.png" alt="Search" width={18} height={18} />
          </button>
        </div>
      </nav>
          
            <div className={styles.signupcontainer}>
                <div className={styles.signupheading}>
                    PERSONAL INFORMATION
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel} htmlFor="firstName">
                        First Name
                    </label>
                    <input type="text" id="firstName" className={styles.inputField} placeholder="First Name" />

                    <label className={styles.inputLabelLast} htmlFor="lastName">
                        Last Name
                    </label>
                    <input type="text" id="lastName" className={styles.inputFieldLast} placeholder="Last Name" />
                </div>
               

                <div className={styles.inputContainer2}>
                    <label className={styles.inputLabel} htmlFor="phone">
                        Phone
                    </label>
                    <input type="text" id="phone" className={styles.inputField} placeholder="Phone" />

                    <label className={styles.inputLabelLast} htmlFor="email">
                        Mail Id
                    </label>
                    <input type="email" id="email" className={styles.inputFieldLast} placeholder="Mail@gmail.com" />
                </div>

                <div className={styles.inputContainer3}>
                    <label className={styles.inputLabel} htmlFor="username">
                        Username
                    </label>
                    <input type="text" id="username" className={styles.inputField} placeholder="Username" />

                    <label className={styles.inputLabelLast} htmlFor="password">
                        Password
                    </label>
                    <input type="password" id="password" className={styles.inputFieldLast} placeholder="Password" />
                </div>
                <div className={styles.new}>

                    <Profile/>
                    </div>
    
            </div>

            <div className={styles.signupcontainer}>
                <div className={styles.signupheading2}>
                    LOCATION INFORMATION
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel} htmlFor="street">
                        Street
                    </label>
                    <input type="text" id="street" className={styles.inputField} placeholder="Street" />

                    <label className={styles.inputLabelLast} htmlFor="city">
                        City
                    </label>
                    <input type="text" id="city" className={styles.inputFieldLast} placeholder="City" />

                    <label className={styles.inputLabelLast2} htmlFor="landmark">
                        Landmark
                    </label>
                    <input type="text" id="landmark" className={styles.inputFieldLast2} placeholder="Landmark" />
                </div>

                <div className={styles.inputContainer2}>
                    <label className={styles.inputLabel} htmlFor="state">
                        State
                    </label>
                    <input type="text" id="state" className={styles.inputField} placeholder="State" />

                    <label className={styles.inputLabelLast} htmlFor="country">
                        Country
                    </label>
                    <input type="email" id="country" className={styles.inputFieldLast} placeholder="Country" />

                    <label className={styles.inputLabelLast2} htmlFor="postalCode">
                        Postal Code
                    </label>
                    <input type="number" id="postalCode" className={styles.inputFieldLast2} placeholder="Postal Code" />

                    <button className={styles.signup_button}>Create Profile</button>
                </div>
            </div>
        </div>
        
    );
};

export default createProfile;


