export const sanitizeGameName = (name: string): string => {
  let sanitized = name.toLowerCase().trim()

  // Remove speacial char likes TM, R
  sanitized = sanitized
  .replace(/(\s*™|\s*®)/g, "")
  .replace(/[:\-]/g, " ")
  .replace(/\s{2,}/g, " ")

  const words = sanitized.split(" ")
  sanitized = words.slice(0, 6).join(" ")
  //sanitized = words.join(" ")
  console.log("Search Name: " + sanitized)

  return sanitized
}

export const parseLanguages = (raw: string): string[] => {
  return raw
    .split(",")
    .map((lang) =>
      lang
        .replace(/<[^>]*>/g, "")
        .replace(/\\u003C/g, "<")
        .replace(/\\u003E/g, ">")
        .replace(/\*/g, "")
        .replace(/languages with.*$/, "")
        .trim()
    )
    .filter((lang) => lang.length > 0)
}