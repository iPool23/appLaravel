export const cleanPressContent = (content: string) => {
    if (!content) return "";
    return content
        .replace(/\[IMAGE:.*?\]/g, '')
        .replace(/[*#_<>]/g, '')
        .trim();
};

export const getSafeSummary = (item: { summary?: string; content?: string; category?: string }, maxLength: number = 160) => {
    const summary = (item.summary || "").trim();
    const isComunicado = item.category === "Comunicado";

    // Si es comunicado, siempre usar contenido. Si no, usar contenido solo si el resumen está vacío o es "-"
    const useContent = isComunicado || summary === "" || summary === "-";

    const textToUse = useContent ? (item.content || "") : summary;
    const cleaned = cleanPressContent(textToUse);

    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.substring(0, maxLength).trim() + "...";
};
