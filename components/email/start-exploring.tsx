interface Props {
  link: string;
}

function StartExploring({ link }: Props) {
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

      <div style={{ padding: "0 15px" }}>
        <p style={{ color: "#666", fontSize: "16px" }}>Dear Abdou,</p>

        <p style={{ color: "#666", fontSize: "16px" }}>
          Your subscription to Algeria World Export is now active! ✨
        </p>

        <p
          style={{
            color: "#666",
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "20px",
          }}>
          What's Next?
        </p>

        {/* Checklist */}
        <div style={{ margin: "15px 0 25px" }}>
          <div
            style={{
              display: "flex",
              marginBottom: "10px",
              alignItems: "center",
            }}>
            <div
              style={{ marginRight: "10px", color: "#555", fontSize: "16px" }}>
              ✓
            </div>
            <div style={{ fontSize: "16px", color: "#666" }}>
              Browse verified Algerian suppliers
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginBottom: "10px",
              alignItems: "center",
            }}>
            <div
              style={{ marginRight: "10px", color: "#555", fontSize: "16px" }}>
              ✓
            </div>
            <div style={{ fontSize: "16px", color: "#666" }}>
              Download product catalogs
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginBottom: "10px",
              alignItems: "center",
            }}>
            <div
              style={{ marginRight: "10px", color: "#555", fontSize: "16px" }}>
              ✓
            </div>
            <div style={{ fontSize: "16px", color: "#666" }}>
              Submit your first order request
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <a
            href={link}
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
            Start Exploring
          </a>
        </div>

        {/* Subscription Info */}
        <p style={{ color: "#666", fontSize: "14px" }}>
          Your subscription is valid until 2025. Need help? Contact us anytime!
        </p>

        <p style={{ color: "#666", fontSize: "14px", marginTop: "20px" }}>
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

export default StartExploring;
