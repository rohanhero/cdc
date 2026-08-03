export const business = {
  name: "Prince CDC Offset Press",
  tagline: "Printing, Designing & Digital Services",
  phone: "+977 9800000000",
  phoneHref: "tel:+9779800000000",
  whatsapp: "+977 9800000000",
  whatsappHref:
    "https://wa.me/9779800000000?text=" +
    encodeURIComponent("Hello Prince CDC Offset Press, I'd like a quote for:"),
  email: "info@princecdcoffsetpress.com",
  address: "Main Road, Kathmandu, Nepal",
  mapQuery: "Main Road, Kathmandu, Nepal",
  hours: [
    { day: "Sunday – Friday", time: "7:00 AM – 8:00 PM" },
    { day: "Saturday", time: "9:00 AM – 2:00 PM" },
  ],
} as const;

export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  business.mapQuery,
)}&output=embed`;
