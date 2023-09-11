jQuery(document).ready(function ($) {
	$("#upload-btn").click(function (e) {
		e.preventDefault();
		var image = wp
			.media({
				title: "Upload Image",
				multiple: false,
			})
			.open()
			.on("select", function (e) {
				var uploaded_image = image.state().get("selection").first();
				var image_url = uploaded_image.toJSON().url;
				$("#image_url").val(image_url);
			});
	});
});


    document.addEventListener('DOMContentLoaded', (event) => {
        let selectField = document.querySelector(
					'select[name="dc_maintenance_options[dc_maintenance_page_type]"]',
				);
        let table = document.querySelector('.form-table');
        let rows = Array.from(table.querySelectorAll('tr'));

        function toggleFieldVisibility() {
            let startRowIndex = 2; // On commence à l'index 3 pour exclure "Définir la page de maintenance"
            let endRowIndex = 10; // Index de la dernière rangée à masquer

            if (selectField.value === 'default') {
                for (let i = startRowIndex; i <= endRowIndex; i++) {
                    rows[i].style.display = ''; // Affichez la rangée
                }
                rows[(2, 10)].style.display = ""; // Affichez la rangée
                rows[1].style.display = 'none'; // Affichez la rangée "Définir la page de maintenance"
            } else {
                for (let i = startRowIndex; i <= endRowIndex; i++) {
                    rows[i].style.display = 'none'; // Masquez la rangée
                }
                rows[1].style.display = ''; // Masquez la rangée "Définir la page de maintenance"
            }
        }
        selectField.addEventListener('change', toggleFieldVisibility);
        toggleFieldVisibility();
    });



jQuery(document).ready(function ($) {
	$(".my-color-field").wpColorPicker();
});

jQuery(document).ready(function ($) {
	$(".date-picker").datetimepicker({
		dateFormat: "dd-mm-yy",
		timeFormat: "HH:mm:ss",
	});
});

jQuery(document).ready(function ($) {
	$(".date-picker").datetimepicker({
		dateFormat: "dd-mm-yy",
		timeFormat: "HH:mm:ss",
		onClose: function (dateText, inst) {
			startCountdown(new Date(dateText));
		},
	});

	function startCountdown(endDate) {
		var countdown = $("#countdown");
		var intervalId = setInterval(function () {
			var now = new Date().getTime();
			var distance = endDate - now;

			// Calcul du temps restant pour les jours, heures, minutes et secondes
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			);
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);

			// Affichage du compte à rebours
			countdown.html(
				days + "d " + hours + "h " + minutes + "m " + seconds + "s ",
			);

			// Si le compte à rebours est fini, afficher un message
			if (distance < 0) {
				clearInterval(intervalId);
				countdown.html("Le site est de nouveau en ligne !");
			}
		}, 1000);
	}
});

