


let colorButton1 = document.querySelector(".rd-color1");
        let colorButton2 = document.querySelector(".rd-color2");
        let copyCode = document.querySelector(".copy-code");
        let copyButton = document.querySelector(".copy-button");

        function getRandomColor() {
            let colorHexCode = "0123456789abcdef";
            let color = "#";

            for (let i = 0; i < 6; i++) {
                color += colorHexCode[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        let color1 = getRandomColor();
        let color2 = getRandomColor();

        function showColor() {
            let gradient = `linear-gradient(to right, ${color1}, ${color2})`;
            document.body.style.background = gradient;
            copyCode.textContent = `background: ${gradient};`;
        }

        colorButton1.addEventListener("click", () => {
            color1 = getRandomColor();
            colorButton1.textContent = color1;
            showColor();
        });

        colorButton2.addEventListener("click", () => {
            color2 = getRandomColor();
            colorButton2.textContent = color2;
            showColor();
        });

        copyButton.addEventListener("click", () => {
            navigator.clipboard.writeText(copyCode.textContent)
                .then(() => {
                    alert("Gradient code copied to clipboard!");
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        });


        colorButton1.textContent = color1;
        colorButton2.textContent = color2;
        showColor();





