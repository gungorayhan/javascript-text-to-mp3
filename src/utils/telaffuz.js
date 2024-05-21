function fonetiktenOkunusa(fonetik) {
    // IPA simgelerinin Türkçe okunuşlarını belirten bir harita
    const ipaHarita = {
        'æ': 'ae', 'ɛ': 'e', 'ɪ': 'i', 'dʒ': 'c', 'oʊ': 'ou',
        'ʌ': 'a', 'ə': 'e', 'iː': 'ii', 'ʊ': 'u', 'uː': 'uu',
        'θ': 'th', 'ð': 'dh', 'ŋ': 'ng', 'ʃ': 'sh', 'ʒ': 'zh',
        'tʃ': 'ch', 'j': 'y', 'w': 'w', 'ɑ': 'a', 'ɒ': 'o',
        'aɪ': 'ay', 'aʊ': 'aw', 'ɔɪ': 'oy', 'p': 'p', 'b': 'b',
        't': 't', 'd': 'd', 'k': 'k', 'g': 'g', 'f': 'f',
        'v': 'v', 's': 's', 'z': 'z', 'h': 'h', 'm': 'm',
        'n': 'n', 'l': 'l', 'r': 'r', 'x': 'ks', 'ɡ': 'g'
    };

    // Okunuşu oluşturacak değişken
    let okunus = '';

    // Her IPA karakterini karşılık gelen Türkçe okunuşla değiştir
    for (let i = 0; i < fonetik.length; i++) {
        const karakter = fonetik[i];
        okunus += ipaHarita[karakter] ? ipaHarita[karakter] : karakter;
    }

    return okunus.trim();
}

// Örnek kullanım
const fonetikKelime = "kənˈtrōlər";
const turkceOkunus = fonetiktenOkunusa(fonetikKelime);
console.log(turkceOkunus); 