function previewImage() {
        var preview = document.getElementById("preview");
        var file = document.getElementById("image").files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
          preview.src = e.target.result;
          preview.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
function encryptImage() {
    var file = document.getElementById("image").files[0];
    var password = document.getElementById("password").value;

    if (!file || !password) {
        alert("Please select an image and enter a password.");
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
        console.log(e.target.result);
        var imageBinaryString = e.target.result.split(",")[1];
        var encrypted = CryptoJS.AES.encrypt(imageBinaryString, password);
        var encryptedDataURL = "data:image/png;base64," + encrypted.toString();
        var encryptedImage = document.getElementById("encrypted-image");
        var encryptedLink = document.getElementById("encrypted-link");

        // Update the encrypted image and button
        encryptedImage.src = encryptedDataURL;
        encryptedImage.style.display = "inline";
        encryptedLink.style.display = "inline";
        
        // Set up download button
        encryptedLink.onclick = function() {
            downloadImage(encryptedDataURL);
            resetFields();
        };
    };

    reader.readAsDataURL(file);
}

function downloadImage(dataURL) {
    const link = document.createElement('a');
    link.href = dataURL; // Use the encrypted data URL
    link.download = "encrypted.png"; // Set default file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function resetFields() {
    document.getElementById("image").value = ""; // Reset file input
    document.getElementById("password").value = ""; // Reset password input
    document.getElementById("encrypted-image").style.display = "none"; // Hide the encrypted image
    document.getElementById("encrypted-link").style.display = "none"; // Hide the download button
    document.getElementById("preview").style.display = "none"; // Hide the original image preview if necessary
}


function decryptImage() {
        var file = document.getElementById("image").files[0];
        var password = document.getElementById("password").value;
        var reader = new FileReader();
        reader.onload = function(e) {
          var encryptedBinaryString = e.target.result.split(",")[1];
          var decrypted = CryptoJS.AES.decrypt(encryptedBinaryString, password);
          try {
            decrypted = decrypted.toString(CryptoJS.enc.Utf8);
          } catch(e) {
            alert("Invalid password");
            return;
          }
          var decryptedDataURL = "data:image/png;base64," + decrypted;
          var decryptedImage = document.getElementById("decrypted-image");
          var decryptedLink = document.getElementById("decrypted-link");
          decryptedImage.src = decryptedDataURL;
          decryptedImage.style.display = "inline";
          decryptedLink.href = decryptedDataURL;
          decryptedLink.style.display = "inline";
        };
        reader.readAsDataURL(file);
      }

