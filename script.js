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

    // Helper to get QR code as blob
    async function getQRCodeBlob() {
        if (!qr) return null;
        // qr.getRawData() returns a Promise<Blob>
        return await qr.getRawData('png');
    }

    // Updated Social share handlers
    async function shareQRCode(platform) {
        if (!qr) return;
        const blob = await getQRCodeBlob();
        if (!blob) return;
        const file = new File([blob], 'qrcode.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: 'QR Code',
                    text: 'Scan this QR code!'
                });
                return;
            } catch (err) {
                // fallback below
            }
        }
        // Fallback: download the image
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qrcode.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('QR code image downloaded. You can now share it manually.');
    }

    function downloadQRCode() {
        if (!qr) return;
        qr.download({ name: 'qrcode', extension: 'png' });
    }

    // Social share handlers
    shareFacebook.addEventListener('click', () => shareQRCode('facebook'));
    shareWhatsapp.addEventListener('click', () => shareQRCode('whatsapp'));
    shareX.addEventListener('click', () => shareQRCode('x'));
    shareInstagram.addEventListener('click', () => shareQRCode('instagram'));
});
