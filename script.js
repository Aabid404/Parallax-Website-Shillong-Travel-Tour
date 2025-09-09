// Toggle "More About"
      document.querySelectorAll(".more-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const moreText = btn.nextElementSibling;
          moreText.style.display =
            moreText.style.display === "block" ? "none" : "block";
        });
      });

      // Lightbox with next/prev
      const images = document.querySelectorAll(".gallery img");
      let currentIndex = 0;
      function openLightbox(index) {
        currentIndex = index;
        const overlay = document.createElement("div");
        overlay.id = "lightbox";
        overlay.style.position = "fixed";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,0.9)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "2000";
        overlay.innerHTML = `
        <button id="prev" style="position:absolute;left:30px;font-size:2rem;color:white;background:none;border:none;cursor:pointer;">⟨</button>
        <img src="${images[currentIndex].src}" style="max-width:90%; max-height:90%; border-radius:12px;">
        <button id="next" style="position:absolute;right:30px;font-size:2rem;color:white;background:none;border:none;cursor:pointer;">⟩</button>
      `;
        overlay.addEventListener("click", (e) => {
          if (e.target.id === "lightbox") overlay.remove();
        });
        document.body.appendChild(overlay);

        document.getElementById("prev").onclick = () => {
          changeImage(-1);
        };
        document.getElementById("next").onclick = () => {
          changeImage(1);
        };
      }
      function changeImage(dir) {
        currentIndex = (currentIndex + dir + images.length) % images.length;
        document.querySelector("#lightbox img").src = images[currentIndex].src;
      }
      images.forEach((img, index) => {
        img.addEventListener("click", () => openLightbox(index));
      });

      // Back to top button
      const backToTop = document.getElementById("backToTop");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          backToTop.style.display = "block";
        } else {
          backToTop.style.display = "none";
        }
      });
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });