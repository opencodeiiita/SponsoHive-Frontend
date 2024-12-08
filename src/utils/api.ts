export const fetchEmails = async () => {
    const response = await fetch("/api/emails");
    return response.json();
  };
  