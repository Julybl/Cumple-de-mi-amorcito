/* =========================================================
   ❤️ BIRTHDAY QUEST
   SCRIPT.JS
   Versión estable y resistente
   ========================================================= */

(function () {

    "use strict";

    /* =====================================================
       01. INICIO SEGURO
       ===================================================== */

    function startApp() {

        console.log(
            "%c❤️ BIRTHDAY QUEST",
            "font-size:22px;font-weight:bold;"
        );

        console.log(
            "%c✓ JavaScript iniciado",
            "font-size:14px;"
        );


        /* =================================================
           02. DOM
           ================================================= */

        const $ = (selector) =>
            document.querySelector(selector);

        const $$ = (selector) =>
            Array.from(document.querySelectorAll(selector));


        const loader =
            document.getElementById("loader");

        const loaderProgress =
            document.getElementById("loader-progress");

        const loaderText =
            document.getElementById("loader-text");

        const app =
            document.getElementById("app");

        const music =
            document.getElementById("background-music");

        const musicButton =
            document.getElementById("music-button");

        const distanceCounter =
            document.getElementById("distance-counter");

        const questionNumber =
            document.getElementById("question-number");

        const totalQuestions =
            document.getElementById("total-questions");

        const quizQuestion =
            document.getElementById("quiz-question");

        const quizOptions =
            document.getElementById("quiz-options");

        const quizFeedback =
            document.getElementById("quiz-feedback");

        const gameNext =
            document.getElementById("game-next");


        let chapters =
            $$(".chapter");


        /* =================================================
           03. ESTILOS DE EMERGENCIA
           ================================================= */

        const emergencyStyle =
            document.createElement("style");

        emergencyStyle.textContent = `

            @keyframes birthdayChapterIn {

                from {
                    opacity: 0;
                    transform:
                        translateY(25px)
                        scale(.985);
                }

                to {
                    opacity: 1;
                    transform:
                        translateY(0)
                        scale(1);
                }

            }


            @keyframes birthdayFloat {

                0% {
                    transform:
                        translateY(20px)
                        rotate(0deg);
                }

                50% {
                    transform:
                        translateY(-30px)
                        rotate(12deg);
                }

                100% {
                    transform:
                        translateY(20px)
                        rotate(0deg);
                }

            }


            @keyframes birthdayHeartPop {

                0% {
                    transform:
                        translate(-50%, -50%)
                        scale(.3);
                    opacity: 0;
                }

                50% {
                    transform:
                        translate(-50%, -50%)
                        scale(1.2);
                    opacity: 1;
                }

                100% {
                    transform:
                        translate(-50%, -50%)
                        scale(1);
                    opacity: 0;
                }

            }


            .hidden {
                display: none !important;
            }


            .birthday-js-particle {
                position: absolute;
                pointer-events: none;
                user-select: none;
            }

        `;

        document.head.appendChild(emergencyStyle);


        /* =================================================
           04. LOADER
           ================================================= */

        const loadingMessages = [
            "Cargando cositas wonitas...",
            "Preparando nuestra historia...",
            "Conectando Argentina con España...",
            "Buscando momentos hermosos...",
            "Preparando tu regalo unu...",
            "Todo listo. :D"
        ];


        let loaderFinished = false;
        let loaderTimer = null;
        let loaderFailsafe = null;


        function hideLoader() {

            if (loaderFinished) {
                return;
            }

            loaderFinished = true;


            if (loaderTimer) {
                clearInterval(loaderTimer);
            }


            if (loaderProgress) {
                loaderProgress.style.width = "100%";
            }


            if (loaderText) {
                loaderText.textContent =
                    "Todo listo. ❤️";
            }


            if (!loader) {
                return;
            }


            loader.classList.add("hidden");

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            loader.style.pointerEvents = "none";


            setTimeout(function () {

                if (loader) {
                    loader.style.display = "none";
                }

            }, 700);

        }


        function startLoader() {

            /*
             * Si no existe loader,
             * continuamos directamente.
             */

            if (!loader) {

                console.warn(
                    "⚠️ #loader no existe. Continuando..."
                );

                return;

            }


            let progress = 0;
            let messageIndex = 0;


            if (loaderProgress) {
                loaderProgress.style.width = "0%";
            }


            if (loaderText) {
                loaderText.textContent =
                    loadingMessages[0];
            }


            loaderTimer =
                setInterval(function () {

                    /*
                     * Incremento seguro.
                     */

                    progress +=
                        Math.random() * 7 + 4;


                    if (progress > 100) {
                        progress = 100;
                    }


                    if (loaderProgress) {

                        loaderProgress.style.width =
                            progress + "%";

                    }


                    const calculatedIndex =
                        Math.min(
                            Math.floor(
                                progress /
                                (100 /
                                loadingMessages.length)
                            ),
                            loadingMessages.length - 1
                        );


                    if (
                        calculatedIndex !==
                        messageIndex
                    ) {

                        messageIndex =
                            calculatedIndex;


                        if (loaderText) {

                            loaderText.textContent =
                                loadingMessages[
                                    messageIndex
                                ];

                        }

                    }


                    if (progress >= 100) {

                        clearInterval(loaderTimer);

                        setTimeout(
                            hideLoader,
                            250
                        );

                    }

                }, 150);


            /*
             * Failsafe.
             *
             * Si por cualquier motivo el
             * contador no termina, liberamos
             * la página igualmente.
             */

            loaderFailsafe =
                setTimeout(function () {

                    if (!loaderFinished) {

                        console.warn(
                            "⚠️ Failsafe del loader activado."
                        );

                        hideLoader();

                    }

                }, 4500);

        }


        /* =================================================
           05. CHAPTERS
           ================================================= */

        const chapterIds = [
            "intro",
            "distance",
            "story",
            "memories",
            "game",
            "final"
        ];


        function refreshChapters() {
            chapters = $$(".chapter");
        }


        function getChapter(id) {

            if (!id) {
                return null;
            }


            /*
             * Primero buscamos:
             * chapter-id
             */

            let chapter =
                document.getElementById(
                    "chapter-" + id
                );


            /*
             * Fallback:
             * por si el HTML usa directamente
             * id="intro", etc.
             */

            if (!chapter) {

                chapter =
                    document.getElementById(id);

            }


            return chapter;
        }


        function showChapter(id) {

            refreshChapters();


            const target =
                getChapter(id);


            if (!target) {

                console.error(
                    "❌ No se encontró el capítulo:",
                    id
                );

                return false;

            }


            /*
             * Desactivar todos.
             */

            chapters.forEach(function (chapter) {

                chapter.classList.remove("active");

                chapter.setAttribute(
                    "aria-hidden",
                    "true"
                );

            });


            /*
             * Activar objetivo.
             */

            target.classList.add("active");

            target.setAttribute(
                "aria-hidden",
                "false"
            );


            /*
             * Animación.
             */

            target.style.animation = "none";

            void target.offsetWidth;

            target.style.animation =
                "birthdayChapterIn .8s ease both";


            /*
             * Volver arriba.
             */

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });


            /*
             * Acciones especiales.
             */

            if (id === "distance") {
                animateDistance();
            }


            if (id === "story") {
                animateTimeline();
            }


            if (id === "memories") {
                animateMemories();
            }


            if (id === "game") {
                prepareQuiz();
            }


            if (id === "final") {
                animateFinal();
            }


            return true;
        }


        /* =================================================
           06. NAVEGACIÓN
           ================================================= */

        function setupNavigation() {

            const buttons =
                $$(".next-button");


            buttons.forEach(function (button) {

                /*
                 * Evitamos agregar listeners
                 * duplicados.
                 */

                if (
                    button.dataset.jsReady === "true"
                ) {
                    return;
                }


                button.dataset.jsReady = "true";


                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        const next =
                            button.dataset.next;


                        if (!next) {

                            console.warn(
                                "⚠️ Botón sin data-next:",
                                button
                            );

                            return;
                        }


                        createClickEffect(button);

                        showChapter(next);

                    }
                );

            });

        }


        /* =================================================
           07. CLICK EFFECT
           ================================================= */

        function createClickEffect(element) {

            if (!element) {
                return;
            }


            const rect =
                element.getBoundingClientRect();


            const ripple =
                document.createElement("span");


            ripple.style.position = "fixed";

            ripple.style.left =
                rect.left +
                rect.width / 2 +
                "px";

            ripple.style.top =
                rect.top +
                rect.height / 2 +
                "px";

            ripple.style.width = "12px";

            ripple.style.height = "12px";

            ripple.style.borderRadius = "50%";

            ripple.style.background =
                "rgba(255,255,255,.65)";

            ripple.style.pointerEvents =
                "none";

            ripple.style.zIndex = "999999";

            ripple.style.transform =
                "translate(-50%, -50%) scale(1)";

            ripple.style.opacity = "1";

            ripple.style.transition =
                "transform .7s ease, opacity .7s ease";


            document.body.appendChild(ripple);


            requestAnimationFrame(function () {

                ripple.style.transform =
                    "translate(-50%, -50%) scale(28)";

                ripple.style.opacity = "0";

            });


            setTimeout(function () {

                if (ripple.parentNode) {
                    ripple.remove();
                }

            }, 800);

        }


        /* =================================================
           08. DISTANCIA
           ================================================= */

        let distanceFrame = null;


        function animateDistance() {

            if (!distanceCounter) {
                return;
            }


            if (distanceFrame) {
                cancelAnimationFrame(distanceFrame);
            }


            const target = 10500;
            const duration = 2200;
            const start = performance.now();


            distanceCounter.textContent = "0";


            function update(currentTime) {

                const elapsed =
                    currentTime - start;


                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );


                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                const current =
                    Math.floor(
                        target * eased
                    );


                distanceCounter.textContent =
                    current.toLocaleString(
                        "es-AR"
                    );


                if (progress < 1) {

                    distanceFrame =
                        requestAnimationFrame(
                            update
                        );

                } else {

                    distanceFrame = null;

                    distanceCounter.textContent =
                        target.toLocaleString(
                            "es-AR"
                        );

                }

            }


            distanceFrame =
                requestAnimationFrame(update);

        }


        /* =================================================
           09. TIMELINE
           ================================================= */

        function animateTimeline() {

            const items =
                $$(".timeline-item");


            items.forEach(function (item, index) {

                item.style.opacity = "0";

                item.style.transform =
                    "translateY(40px)";


                item.style.transition =
                    "opacity .8s ease, transform .8s ease";


                setTimeout(function () {

                    item.style.opacity = "1";

                    item.style.transform =
                        "translateY(0)";

                }, 150 + index * 180);

            });

        }


        /* =================================================
           10. MEMORIES
           ================================================= */

        function animateMemories() {

            const cards =
                $$(".memory-card");


            cards.forEach(function (card, index) {

                card.style.opacity = "0";

                card.style.transform =
                    "translateY(45px) scale(.96)";


                card.style.transition =
                    "opacity .8s ease, transform .8s ease";


                setTimeout(function () {

                    card.style.opacity = "1";

                    card.style.transform =
                        "translateY(0) scale(1)";

                }, 120 + index * 150);

            });

        }


        /* =================================================
           11. IMÁGENES
           ================================================= */

        function setupImages() {

            const images =
                $$(".memory-card img");


            images.forEach(function (image) {

                image.addEventListener(
                    "load",
                    function () {

                        image.style.opacity = "1";

                    }
                );


                image.addEventListener(
                    "error",
                    function () {

                        console.warn(
                            "⚠️ Imagen no encontrada:",
                            image.src
                        );


                        /*
                         * No ocultamos totalmente
                         * la tarjeta.
                         */

                        image.style.opacity = ".35";

                    }
                );

            });

        }


        /* =================================================
           12. QUIZ
           ================================================= */

        const quiz = {

            question:
                "¿Cuál fue nuestro primer Ship?",

            options: [

                {
                    text:
                        "Kunigami x Chigiri fem",

                    correct: false
                },

                {
                    text:
                        "Nagi x Reo fem",

                    correct: true
                },

                {
                    text:
                        "Maki x Yuta",

                    correct: false
                }

            ]

        };


        let quizAnswered = false;


        /* =================================================
           13. PREPARAR QUIZ
           ================================================= */

        function prepareQuiz() {

            /*
             * Si el HTML todavía no tiene
             * el quiz, simplemente no hacemos nada.
             */

            if (
                !quizQuestion ||
                !quizOptions
            ) {

                console.warn(
                    "⚠️ Elementos del quiz no encontrados."
                );

                return;

            }


            quizAnswered = false;


            if (questionNumber) {
                questionNumber.textContent = "1";
            }


            if (totalQuestions) {
                totalQuestions.textContent = "1";
            }


            quizQuestion.textContent =
                quiz.question;


            quizOptions.innerHTML = "";


            if (quizFeedback) {

                quizFeedback.textContent = "";

                quizFeedback.style.opacity = "0";

                quizFeedback.style.transform =
                    "translateY(10px)";

            }


            if (gameNext) {

                gameNext.classList.add("hidden");

                gameNext.style.opacity = "0";

                gameNext.style.pointerEvents =
                    "none";

            }


            quiz.options.forEach(
                function (option, index) {

                    const button =
                        document.createElement(
                            "button"
                        );


                    button.type = "button";

                    button.className =
                        "quiz-option";


                    button.textContent =
                        option.text;


                    button.dataset.correct =
                        option.correct
                            ? "true"
                            : "false";


                    /*
                     * Animación inicial.
                     */

                    button.style.opacity = "0";

                    button.style.transform =
                        "translateY(20px)";


                    button.style.transition =
                        "opacity .45s ease, transform .45s ease";


                    button.addEventListener(
                        "click",
                        function () {

                            checkQuizAnswer(
                                button,
                                option.correct
                            );

                        }
                    );


                    quizOptions.appendChild(button);


                    setTimeout(function () {

                        button.style.opacity = "1";

                        button.style.transform =
                            "translateY(0)";

                    }, 100 + index * 130);

                }
            );

        }


        /* =================================================
           14. RESPUESTA QUIZ
           ================================================= */

        function checkQuizAnswer(
            selectedButton,
            isCorrect
        ) {

            if (quizAnswered) {
                return;
            }


            quizAnswered = true;


            const buttons =
                $$(".quiz-option");


            buttons.forEach(function (button) {

                button.disabled = true;

                button.style.pointerEvents =
                    "none";

                button.style.cursor =
                    "default";

            });


            if (isCorrect) {

                selectedButton.classList.add(
                    "correct"
                );


                selectedButton.style.transform =
                    "scale(1.04)";


                if (quizFeedback) {

                    quizFeedback.textContent =
                        "✓ CORRECTO.  Obviamente te acordabas bb.";

                    quizFeedback.style.opacity =
                        "1";

                    quizFeedback.style.transform =
                        "translateY(0)";

                }


                createHeartExplosion(
                    selectedButton
                );

            } else {

                selectedButton.classList.add(
                    "wrong"
                );


                /*
                 * Mostrar la respuesta correcta.
                 */

                buttons.forEach(function (button) {

                    if (
                        button.dataset.correct ===
                        "true"
                    ) {

                        button.classList.add(
                            "correct"
                        );

                    }

                });


                if (quizFeedback) {

                    quizFeedback.textContent =
                        "✕ Casi... pero igual te quiero. unu";

                    quizFeedback.style.opacity =
                        "1";

                    quizFeedback.style.transform =
                        "translateY(0)";

                }

            }


            /*
             * Mostrar siguiente.
             */

            if (gameNext) {

                setTimeout(function () {

                    gameNext.classList.remove(
                        "hidden"
                    );


                    gameNext.style.display =
                        "";


                    gameNext.style.opacity =
                        "1";


                    gameNext.style.pointerEvents =
                        "auto";


                    gameNext.style.transform =
                        "translateY(0)";


                    /*
                     * Pequeño efecto.
                     */

                    gameNext.animate(
                        [
                            {
                                opacity: 0,
                                transform:
                                    "translateY(20px) scale(.95)"
                            },
                            {
                                opacity: 1,
                                transform:
                                    "translateY(0) scale(1)"
                            }
                        ],
                        {
                            duration: 500,
                            easing:
                                "cubic-bezier(.2,.8,.2,1)"
                        }
                    );

                }, 650);

            }

        }


        /* =================================================
           15. EXPLOSIÓN DE CORAZONES
           ================================================= */

        function createHeartExplosion(element) {

            if (!element) {
                return;
            }


            const rect =
                element.getBoundingClientRect();


            const amount = 18;


            for (
                let i = 0;
                i < amount;
                i++
            ) {

                const heart =
                    document.createElement("span");


                heart.textContent = "♥";


                heart.style.position =
                    "fixed";


                heart.style.left =
                    rect.left +
                    rect.width / 2 +
                    "px";


                heart.style.top =
                    rect.top +
                    rect.height / 2 +
                    "px";


                heart.style.zIndex =
                    "999999";


                heart.style.pointerEvents =
                    "none";


                heart.style.userSelect =
                    "none";


                heart.style.fontSize =
                    10 +
                    Math.random() * 16 +
                    "px";


                heart.style.opacity = "1";


                heart.style.transform =
                    "translate(-50%, -50%) scale(.5)";


                const angle =
                    Math.random() *
                    Math.PI *
                    2;


                const distance =
                    50 +
                    Math.random() *
                    130;


                const x =
                    Math.cos(angle) *
                    distance;


                const y =
                    Math.sin(angle) *
                    distance;


                heart.style.transition =
                    "transform 1s cubic-bezier(.2,.8,.2,1), opacity 1s ease";


                document.body.appendChild(
                    heart
                );


                requestAnimationFrame(
                    function () {

                        heart.style.transform =
                            "translate(calc(-50% + " +
                            x +
                            "px), calc(-50% + " +
                            y +
                            "px)) scale(1)";

                        heart.style.opacity =
                            "0";

                    }
                );


                setTimeout(function () {

                    if (heart.parentNode) {
                        heart.remove();
                    }

                }, 1100);

            }

        }


        /* =================================================
           16. BOTÓN FINAL DEL QUIZ
           ================================================= */

        function setupGameNext() {

            if (!gameNext) {
                return;
            }


            gameNext.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    if (!quizAnswered) {
                        return;
                    }


                    createClickEffect(
                        gameNext
                    );


                    setTimeout(function () {

                        showChapter("final");

                    }, 120);

                }
            );

        }


        /* =================================================
           17. FINAL
           ================================================= */

        let finalAnimated = false;


        function animateFinal() {

            const reveal =
                document.getElementById(
                    "final-reveal"
                );


            if (reveal) {

                reveal.style.opacity = "0";

                reveal.style.transform =
                    "translateY(30px) scale(.97)";


                reveal.style.transition =
                    "opacity 1.2s ease, transform 1.2s ease";


                setTimeout(function () {

                    reveal.style.opacity = "1";

                    reveal.style.transform =
                        "translateY(0) scale(1)";

                }, 300);

            }


            const finalHeart =
                $(".final-heart");


            if (finalHeart) {

                finalHeart.style.opacity = "0";

                finalHeart.style.transform =
                    "scale(.5)";


                finalHeart.style.transition =
                    "transform 1s cubic-bezier(.2,.8,.2,1), opacity 1s ease";


                setTimeout(function () {

                    finalHeart.style.opacity = "1";

                    finalHeart.style.transform =
                        "scale(1)";

                }, 750);

            }


            /*
             * Las partículas solamente se crean
             * una vez.
             */

            if (!finalAnimated) {

                finalAnimated = true;

                createFinalParticles();

            }

        }


        /* =================================================
           18. PARTÍCULAS FINALES
           ================================================= */

        function createFinalParticles() {

            const finalChapter =
                getChapter("final");


            if (!finalChapter) {
                return;
            }


            /*
             * Evitar duplicados.
             */

            const old =
                finalChapter.querySelector(
                    ".js-final-particles"
                );


            if (old) {
                old.remove();
            }


            const container =
                document.createElement("div");


            container.className =
                "js-final-particles";


            container.style.position =
                "absolute";


            container.style.inset =
                "0";


            container.style.overflow =
                "hidden";


            container.style.pointerEvents =
                "none";


            container.style.zIndex =
                "0";


            for (
                let i = 0;
                i < 45;
                i++
            ) {

                const particle =
                    document.createElement("span");


                particle.className =
                    "birthday-js-particle";


                particle.textContent =
                    Math.random() > .7
                        ? "♥"
                        : "·";


                particle.style.left =
                    Math.random() * 100 +
                    "%";


                particle.style.top =
                    Math.random() * 100 +
                    "%";


                particle.style.fontSize =
                    8 +
                    Math.random() * 12 +
                    "px";


                particle.style.opacity =
                    .15 +
                    Math.random() * .45;


                particle.style.animation =
                    "birthdayFloat " +
                    (4 +
                    Math.random() * 6) +
                    "s ease-in-out infinite";


                particle.style.animationDelay =
                    Math.random() * 4 +
                    "s";


                container.appendChild(
                    particle
                );

            }


            /*
             * Aseguramos que las partículas
             * queden detrás del contenido.
             */

            finalChapter.style.position =
                finalChapter.style.position ||
                "relative";


            finalChapter.prepend(
                container
            );

        }


        /* =================================================
           19. MÚSICA
           ================================================= */

        let musicPlaying = false;


        function setupMusic() {

            /*
             * Si falta alguno de los dos,
             * no hacemos nada.
             */

            if (
                !music ||
                !musicButton
            ) {

                console.warn(
                    "⚠️ Música no configurada."
                );

                return;

            }


            musicButton.addEventListener(
                "click",
                async function () {

                    try {

                        if (
                            music.paused
                        ) {

                            await music.play();

                            musicPlaying =
                                true;


                            musicButton.textContent =
                                "♫";


                            musicButton.setAttribute(
                                "aria-label",
                                "Pausar música"
                            );


                            musicButton.classList.add(
                                "playing"
                            );

                        } else {

                            music.pause();

                            musicPlaying =
                                false;


                            musicButton.textContent =
                                "♪";


                            musicButton.setAttribute(
                                "aria-label",
                                "Activar música"
                            );


                            musicButton.classList.remove(
                                "playing"
                            );

                        }

                    } catch (error) {

                        console.warn(
                            "⚠️ No se pudo reproducir la música.",
                            error
                        );

                    }

                }
            );


            music.addEventListener(
                "play",
                function () {

                    musicPlaying = true;

                    musicButton.textContent =
                        "♫";

                    musicButton.classList.add(
                        "playing"
                    );

                }
            );


            music.addEventListener(
                "pause",
                function () {

                    musicPlaying = false;

                    musicButton.textContent =
                        "♪";

                    musicButton.classList.remove(
                        "playing"
                    );

                }
            );


            music.addEventListener(
                "ended",
                function () {

                    musicPlaying = false;

                    musicButton.textContent =
                        "♪";

                    musicButton.classList.remove(
                        "playing"
                    );

                }
            );

        }


        /* =================================================
           20. TECLADO
           ================================================= */

        function setupKeyboard() {

            document.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Escape"
                    ) {

                        showChapter(
                            "intro"
                        );

                    }

                }
            );

        }


        /* =================================================
           21. SWIPE MOBILE
           ================================================= */

        function setupSwipe() {

            let touchStartX = 0;
            let touchEndX = 0;


            document.addEventListener(
                "touchstart",
                function (event) {

                    if (
                        !event.changedTouches ||
                        !event.changedTouches.length
                    ) {
                        return;
                    }


                    touchStartX =
                        event.changedTouches[0]
                            .screenX;

                },
                {
                    passive: true
                }
            );


            document.addEventListener(
                "touchend",
                function (event) {

                    if (
                        !event.changedTouches ||
                        !event.changedTouches.length
                    ) {
                        return;
                    }


                    touchEndX =
                        event.changedTouches[0]
                            .screenX;


                    const difference =
                        touchEndX -
                        touchStartX;


                    if (
                        Math.abs(difference) <
                        80
                    ) {
                        return;
                    }


                    const active =
                        $(".chapter.active");


                    if (!active) {
                        return;
                    }


                    let currentId =
                        active.id
                            .replace(
                                "chapter-",
                                ""
                            );


                    /*
                     * Si el HTML usa id directo.
                     */

                    if (
                        currentId ===
                        active.id &&
                        chapterIds.includes(
                            active.id
                        )
                    ) {

                        currentId =
                            active.id;

                    }


                    const currentIndex =
                        chapterIds.indexOf(
                            currentId
                        );


                    if (currentIndex === -1) {
                        return;
                    }


                    /*
                     * Izquierda = siguiente
                     */

                    if (
                        difference < 0 &&
                        currentIndex <
                        chapterIds.length - 1
                    ) {

                        showChapter(
                            chapterIds[
                                currentIndex + 1
                            ]
                        );

                    }


                    /*
                     * Derecha = anterior
                     */

                    if (
                        difference > 0 &&
                        currentIndex > 0
                    ) {

                        showChapter(
                            chapterIds[
                                currentIndex - 1
                            ]
                        );

                    }

                },
                {
                    passive: true
                }
            );

        }


        /* =================================================
           22. INICIALIZACIÓN
           ================================================= */

        refreshChapters();


        /*
         * Ocultar todos los capítulos.
         */

        chapters.forEach(
            function (chapter) {

                chapter.classList.remove(
                    "active"
                );

                chapter.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }
        );


        /*
         * Mostrar INTRO.
         */

        const intro =
            getChapter("intro");


        if (intro) {

            intro.classList.add(
                "active"
            );

            intro.setAttribute(
                "aria-hidden",
                "false"
            );

        } else {

            console.warn(
                "⚠️ No existe chapter-intro."
            );

        }


        /*
         * Preparar valores iniciales.
         */

        if (distanceCounter) {
            distanceCounter.textContent = "0";
        }


        if (app) {

            app.style.visibility =
                "visible";

            app.style.opacity =
                "1";

        }


        /*
         * Configurar funcionalidades.
         */

        setupNavigation();

        setupImages();

        setupGameNext();

        setupMusic();

        setupKeyboard();

        setupSwipe();


        /*
         * IMPORTANTE:
         * El quiz se prepara, pero no se muestra
         * hasta entrar al capítulo GAME.
         */

        if (
            quizQuestion &&
            quizOptions
        ) {

            /*
             * Solamente establecemos
             * el texto inicial.
             */

            quizQuestion.textContent =
                quiz.question;

        }


        /*
         * Arrancar loader AL FINAL,
         * después de que todo esté preparado.
         */

        startLoader();


        console.log(
            "%c✓ Birthday Quest inicializado correctamente.",
            "color:#00ff99;font-weight:bold;"
        );

    }


    /* =====================================================
       23. ARRANQUE
       ===================================================== */

    /*
     * Funciona tanto si el script está en <head>
     * como si está al final del <body>.
     */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startApp,
            {
                once: true
            }
        );

    } else {

        startApp();

    }


})();