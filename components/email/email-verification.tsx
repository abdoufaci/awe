interface Props {
  link: string;
}

export default function EmailVerification({ link }: Props) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        color: "#555",
        lineHeight: 1.5,
      }}>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <img
          src="https://88a6fxq8sy.ufs.sh/f/4I4ostcSHpwPFH6E58eAz6FAvJlByxMhZ7GgsSi3OeVf1ja4"
          alt="Algeria World Export Logo"
          style={{ width: "150px", height: "auto" }}
        />
      </div>

      {/* Email Content */}
      <div style={{ padding: "0 15px" }}>
        <p style={{ color: "#666", fontSize: "16px" }}>Dear Abdou,</p>

        <p style={{ color: "#666", fontSize: "16px" }}>
          Welcome to Algeria World Export! 🎉 You've just unlocked access to a
          world of high-quality Algerian products, ready for export. Here's what
          you can do next:
        </p>

        {/* Checklist */}
        <div style={{ margin: "25px 0" }}>
          <div style={{ display: "flex", marginBottom: "15px" }}>
            <div
              style={{
                marginRight: "10px",
                color: "#fff",
                backgroundColor: "#4CAF50",
                borderRadius: "3px",
                width: "18px",
                height: "18px",
                textAlign: "center",
                lineHeight: "18px",
              }}>
              ✓
            </div>
            <div style={{ fontSize: "16px" }}>
              <strong>Verify Your Email</strong> - Click the button below to
              confirm your account and access our platform.
            </div>
          </div>

          <div style={{ display: "flex", marginBottom: "15px" }}>
            <div
              style={{
                marginRight: "10px",
                color: "#fff",
                backgroundColor: "#4CAF50",
                borderRadius: "3px",
                width: "18px",
                height: "18px",
                textAlign: "center",
                lineHeight: "18px",
              }}>
              ✓
            </div>
            <div style={{ fontSize: "16px" }}>
              <strong>Explore Export Categories</strong> - Browse a wide range
              of verified Algerian suppliers.
            </div>
          </div>

          <div style={{ display: "flex", marginBottom: "15px" }}>
            <div
              style={{
                marginRight: "10px",
                color: "#fff",
                backgroundColor: "#4CAF50",
                borderRadius: "3px",
                width: "18px",
                height: "18px",
                textAlign: "center",
                lineHeight: "18px",
              }}>
              ✓
            </div>
            <div style={{ fontSize: "16px" }}>
              <strong>Submit an Order Request</strong> - Place your request, and
              we'll handle the export process for you.
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <a
            href={link}
            target="_blank"
            style={{
              backgroundColor: "#1E88E5",
              color: "white",
              padding: "12px 20px",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "16px",
              display: "block",
              textAlign: "center",
            }}>
            Verify your email
          </a>
        </div>

        {/* Footer Text */}
        <p style={{ color: "#666", fontSize: "14px" }}>
          If you have any questions, our support team is here to help! Simply
          reply to this email or visit our Help Center.
          <br />
          Welcome aboard, and happy exporting!
        </p>

        <p style={{ color: "#666", fontSize: "14px" }}>
          Best regards,
          <br />
          The Algeria World Export Team
        </p>
      </div>

      {/* Social Media Links */}
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          paddingTop: "20px",
          borderTop: "1px solid #eee",
        }}>
        <a
          href={link}
          target="_blank"
          style={{
            display: "inline-block",
            margin: "0 10px",
            textDecoration: "none",
          }}>
          <img
            src="https://88a6fxq8sy.ufs.sh/f/4I4ostcSHpwPqkars4TDcG7ZjaoOngw4f3RCVz6xsXKHyBhS"
            alt="Facebook"
            style={{ width: "24px", height: "24px", objectFit: "contain" }}
          />
        </a>
        <a
          href={link}
          target="_blank"
          style={{
            display: "inline-block",
            margin: "0 10px",
            textDecoration: "none",
          }}>
          <img
            src="https://88a6fxq8sy.ufs.sh/f/4I4ostcSHpwPZBERMLl3nEmelA14ugPIfx50pFXYsrwaQqiC"
            alt="Instagram"
            style={{ width: "24px", height: "24px", objectFit: "contain" }}
          />
        </a>

        <p style={{ color: "#999", fontSize: "12px", marginTop: "15px" }}>
          algeriaworldexport@gmail.com
          <br />
          <a
            href="http://www.algeriaworldexport.com"
            style={{ color: "#999", textDecoration: "underline" }}>
            www.algeriaworldexport.com
          </a>
        </p>
      </div>
    </div>
  );
}
