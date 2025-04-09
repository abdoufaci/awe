interface Props {
  link: string;
  username: string;
}

function FeesPayed({ link, username }: Props) {
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
      <div>
        <p style={{ color: "#666", fontSize: "16px", margin: "15px 0" }}>
          Dear {username},
        </p>

        <p style={{ color: "#666", fontSize: "16px", margin: "15px 0" }}>
          We've received your service fee payment, and your order is now being
          processed!
        </p>

        {/* Next Steps */}
        <p
          style={{
            color: "#666",
            fontSize: "16px",
            fontWeight: "bold",
            margin: "15px 0",
          }}>
          Next Steps:
        </p>

        {/* Steps List */}
        <div style={{ margin: "15px 0" }}>
          <p
            style={{
              color: "#666",
              fontSize: "14px",
              margin: "8px 0",
              display: "flex",
              alignItems: "flex-start",
            }}>
            <span style={{ marginRight: "5px", color: "#555" }}>✓</span>
            <span>We'll confirm availability with suppliers</span>
          </p>

          <p
            style={{
              color: "#666",
              fontSize: "14px",
              margin: "8px 0",
              display: "flex",
              alignItems: "flex-start",
            }}>
            <span style={{ marginRight: "5px", color: "#555" }}>✓</span>
            <span>You'll receive final shipping documents soon</span>
          </p>

          <p
            style={{
              color: "#666",
              fontSize: "14px",
              margin: "8px 0",
              display: "flex",
              alignItems: "flex-start",
            }}>
            <span style={{ marginRight: "5px", color: "#555" }}>✓</span>
            <span>
              Bank transfer required: Please proceed with the total product
              payment via bank transfer
            </span>
          </p>

          <p
            style={{
              color: "#666",
              fontSize: "14px",
              margin: "8px 0",
              display: "flex",
              alignItems: "flex-start",
            }}>
            <span style={{ marginRight: "5px", color: "#555" }}>✓</span>
            <span>
              Payment details & documents are available on your dashboard
            </span>
          </p>

          <p
            style={{
              color: "#666",
              fontSize: "14px",
              margin: "8px 0",
              display: "flex",
              alignItems: "flex-start",
            }}>
            <span style={{ marginRight: "5px", color: "#555" }}>✓</span>
            <span>
              Upload proof of payment: After completing the transfer, upload a
              photo or scanned proof on the platform
            </span>
          </p>
        </div>

        {/* View Order Details Button */}
        <div style={{ margin: "20px 0" }}>
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
            View Order Details
          </a>
        </div>

        {/* Closing Message */}
        <p style={{ color: "#666", fontSize: "14px", margin: "20px 0 10px" }}>
          Once we confirm your payment, we will finalize your shipment. Let us
          know if you need any assistance!
        </p>

        <p style={{ color: "#666", fontSize: "14px", margin: "10px 0" }}>
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

export default FeesPayed;
