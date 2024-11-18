import React from "react";
import styles from "../../css/user/Join.module.css";

function Join() {
    return (
        <div className={styles.joinContainer}>
            <h1 className={styles.joinTitle}>
                We Need Information<br />For Create Account<br />Please Fill In The Blank
            </h1>
            
            <form>
                {/* ID */}
                <div className={styles.formGroup}>
                    <label htmlFor="id">ID</label>
                    <div className={styles.inputGroup}>
                        <input type="text" id="id" placeholder="Enter your ID" />
                        <button type="button">Check</button>
                    </div>
                </div>

                {/* Password */}
                <div className={styles.formGroup}>
                    <label htmlFor="password">PASSWORD</label>
                    <input type="password" id="password" placeholder="Enter your password" />
                </div>

                {/* Password Check */}
                <div className={styles.formGroup}>
                    <label htmlFor="password-check">PASSWORD CHECK</label>
                    <input type="password" id="password-check" placeholder="Re-enter your password" />
                </div>

                {/* Address */}
                <div className={styles.formGroup}>
                    <label htmlFor="address">ADDRESS</label>
                    <div className={styles.inputGroup}>
                        <input type="text" id="postcode" placeholder="Postcode" />
                        <button type="button">Find</button>
                    </div>
                    <input type="text" id="address" placeholder="Address" />
                    <input type="text" id="detail-address" placeholder="Detail Address" />
                    <input type="text" id="extra-address" placeholder="Extra Address" />
                </div>

                {/* Phone */}
                <div className={styles.formGroup}>
                    <label htmlFor="phone">PHONE</label>
                    <div className={styles.inputGroup}>
                        <input type="text" id="phone" placeholder="Enter your phone number" />
                        <button type="button">Send</button>
                    </div>
                    <div className={styles.inputGroup}>
                        <input type="text" id="phone-code" placeholder="Enter code" />
                        <button type="button">Verify</button>
                    </div>
                </div>

                {/* Name */}
                <div className={styles.formGroup}>
                    <label htmlFor="name">NAME</label>
                    <input type="text" id="name" placeholder="Enter your name" />
                </div>

                {/* Email */}
                <div className={styles.formGroup}>
                    <label htmlFor="email">EMAIL</label>
                    <div className={styles.inputGroup}>
                        <input type="email" id="email" placeholder="Enter your email" />
                        <button type="button">Send</button>
                    </div>
                    <div className={styles.inputGroup}>
                        <input type="text" id="email-code" placeholder="Enter code" />
                        <button type="button">Verify</button>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton}>MAKE ACCOUNT</button>
            </form>
        </div>
    );
}

export default Join;
