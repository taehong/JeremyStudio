private static byte[] _BleachImage(byte[] pixelData, int bytesPerPixel)
{
	byte[] newPixelData = new byte[pixelData.Length];
	double desaturation = 0.75;
	double gray = 0.0;
	for (int i = 0, length = pixelData.Length; i < length; i += bytesPerPixel)
	{
		gray = (pixelData[i] * 0.11) + (pixelData[i+1] * 0.59) + (pixelData[i+2] * 0.3);
		newPixelData[i] = (byte) (pixelData[i] + desaturation * (gray - pixelData[i]));
		newPixelData[i + 1] = (byte)(pixelData[i+1] + desaturation * (gray - pixelData[i+1]));
		newPixelData[i + 2] = (byte)(pixelData[i+2] + desaturation * (gray - pixelData[i+2]));
	}

	return newPixelData;
}

private static byte[] _GrainyBlackAndWhiteImage(byte[] pixelData, int bytesPerPixel)
        {
            byte[] newPixelData = new byte[pixelData.Length];
            byte gray = 0;
            for (int i = 0, length = pixelData.Length; i < length; i += bytesPerPixel)
            {
                gray = Math.Min(pixelData[i], pixelData[i+1]);
                gray = Math.Min(gray, pixelData[i + 2]);
                newPixelData[i] = newPixelData[i + 1] = newPixelData[i + 2] = gray; 
            }
            return newPixelData;
        }