document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const qrcodeDiv = document.getElementById('qrcode');
    const shareSection = document.getElementById('shareSection');
    const shareFacebook = document.getElementById('shareFacebook');
    const shareWhatsapp = document.getElementById('shareWhatsapp');
    const shareX = document.getElementById('shareX');
    const shareInstagram = document.getElementById('shareInstagram');
    let qr = null;
    let currentUrl = '';

    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateQRCode();
        }
    });

    function generateQRCode() {
        const url = urlInput.value.trim();
        if (!url) {
            alert('Please enter a valid URL');
            return;
        }
        currentUrl = url;
        qrcodeDiv.innerHTML = '';
        qr = new QRCodeStyling({
            width: 256,
            height: 256,
            data: url,
            dotsOptions: {
                type: 'square',
                color: '#000'
            },
            backgroundOptions: {
                color: '#fff'
            },
            cornersSquareOptions: {
                type: 'square',
                color: '#000'
            }
        });
        qr.append(qrcodeDiv);
        downloadBtn.classList.remove('hidden');
        shareSection.classList.remove('hidden');
    }

    function downloadQRCode() {
        if (!qr) return;
        qr.download({ name: 'qrcode', extension: 'png' });
    }

    // Social share handlers
    shareFacebook.addEventListener('click', () => {
        if (!currentUrl) return;
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        window.open(shareUrl, '_blank');
    });
    shareWhatsapp.addEventListener('click', () => {
        if (!currentUrl) return;
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
        window.open(shareUrl, '_blank');
    });
    shareX.addEventListener('click', () => {
        if (!currentUrl) return;
        const shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
        window.open(shareUrl, '_blank');
    });
    shareInstagram.addEventListener('click', () => {
        alert('Instagram does not support direct URL sharing via web. Please copy and share manually.');
    });
});
