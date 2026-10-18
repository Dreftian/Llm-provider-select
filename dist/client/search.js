/**
 * Subsequence and fuzzy matching algorithm inspired by OpenCode Desktop.
 */
export function matchesModelSearch(text, query) {
    const normText = text.toLowerCase().trim();
    const normQuery = query.toLowerCase().trim();
    if (!normQuery) {
        return { matches: true, score: 0 };
    }
    // Exact or prefix match gets highest score
    if (normText.startsWith(normQuery)) {
        return { matches: true, score: 100 - (normText.length - normQuery.length) };
    }
    // Substring match gets medium score
    const subIndex = normText.indexOf(normQuery);
    if (subIndex !== -1) {
        return { matches: true, score: 70 - subIndex };
    }
    // Ordered subsequence match
    let qIdx = 0;
    let score = 0;
    for (let tIdx = 0; tIdx < normText.length && qIdx < normQuery.length; tIdx++) {
        if (normText[tIdx] === normQuery[qIdx]) {
            qIdx++;
            score += 10;
        }
    }
    if (qIdx === normQuery.length) {
        return { matches: true, score };
    }
    return { matches: false, score: -1 };
}
//# sourceMappingURL=search.js.map