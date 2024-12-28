import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { saveAs } from 'file-saver';
import {jwtDecode} from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const QrCode = () => {

    const [value, setValue] = useState('');
    const [cookies] = useCookies(['token']);

    const downloadQRCode = () => {
        const canvas = document.getElementById('qr-gen');
        if (canvas) {
            canvas.toBlob((blob) => {
                saveAs(blob, 'qrcode.png');
            });
        }
    };

    useEffect(() => {
        if (cookies) {
            const user = jwtDecode(cookies.token);
            setValue(user.id);
        }
    }, []);

    return (
        <div className="h-auto w-full p-4 absolute top-32 flex flex-col items-center">
            <QRCodeCanvas id="qr-gen" value={value} size={256} />
            <button
                onClick={downloadQRCode}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Download QR Code
            </button>
        </div>
    );
};

export default QrCode;
