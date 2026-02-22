import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, image, url }) => {
  const siteTitle = "BalaG Studios | Cinematic Wedding Photography";
  const defaultDescription =
    "Award-winning wedding photography and cinematography based in Rishikesh. Capturing timeless, candid moments worldwide.";
  const defaultImage =
    "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&w=1200&q=80"; // Your best hero shot
  const siteUrl = "https://balagstudios.com";

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title ? `${title} | BalaG Studios` : siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />

      {/* Open Graph / Facebook (Critical for WhatsApp/IG sharing) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />
      <meta property="og:title" content={title || siteTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

export default SEO;
