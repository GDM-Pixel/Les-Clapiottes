//THIS IS THE ONE
jQuery(document).ready(function ($) {
	// Fonctions d'initialisation pour les datepickers

	function initializeClapiDatePicker() {
		$("#delivery_date_clapi").datepicker({
			minDate: "+1d",
			beforeShowDay: function (date) {
				const dayOfWeek = date.getDay();
				return [dayOfWeek === 4 || dayOfWeek === 5 || dayOfWeek === 6];
			},
			onSelect: function (dateText) {
				const container = $(".whencontainerclapiottes");
				checkAvailability(dateText, container);

				document.cookie =
					"selected_date_clapi=" + dateText + "; path=/; max-age=86400";
				$("#clapidatevalue").text(dateText);
			},
		});
	}

	function initializeBrunchDatePicker() {
		$("#delivery_date_brunch").datepicker({
			minDate: "+1d",
			beforeShowDay: function (date) {
				const dayOfWeek = date.getDay();
				return [dayOfWeek === 0 || dayOfWeek === 6];
			},
			onSelect: function (dateText) {
				const container = $(".whencontainerbrunch");
				checkAvailabilityBrunch(dateText, container);

				document.cookie =
					"selected_date_brunch=" + dateText + "; path=/; max-age=86400";
				$("#brunchdatevalue").text(dateText);
			},
		});
	}

	//SELECTION DE DATE pour les CLAPIOTTES
	function getNextAvailableDate() {
		const today = new Date();
		let nextDay = new Date(today);
		nextDay.setDate(today.getDate() + 1);

		while ([4, 5, 6].indexOf(nextDay.getDay()) === -1) {
			nextDay.setDate(nextDay.getDate() + 1);
		}

		return nextDay;
	}

	const defaultDate = getNextAvailableDate();

	// Formater la date dans le format que vous souhaitez
	const options = {
		day: "numeric",
		month: "long",
		year: "numeric",
	};
	const formattedDate = defaultDate.toLocaleDateString("fr-FR", options);

	// Fonction pour vérifier et créer le cookie s'il n'existe pas
	function setDefaultDateCookieIfNotExist() {
		const cookieArray = document.cookie.split(";");
		const cookieName = "selected_date_clapi=";
		let cookieExists = false;

		for (let i = 0; i < cookieArray.length; i++) {
			let cookie = cookieArray[i];
			while (cookie.charAt(0) === " ") {
				cookie = cookie.substring(1);
			}
			if (cookie.indexOf(cookieName) === 0) {
				cookieExists = true;
				break;
			}
		}

		if (!cookieExists) {
			document.cookie =
				"selected_date_clapi=" + formattedDate + "; path=/; max-age=86400"; // 86400 secondes = 1 jour
		}
	}

	// Appel de la nouvelle fonction pour vérifier le cookie
	setDefaultDateCookieIfNotExist();

	// Initialisation du datepicker
	$("#delivery_date_clapi").datepicker({
		minDate: "+1d",
		beforeShowDay: function (date) {
			const dayOfWeek = date.getDay();
			return [dayOfWeek === 4 || dayOfWeek === 5 || dayOfWeek === 6];
		},
		onSelect: function (dateText) {
			const container = $(".whencontainerclapiottes");
			checkAvailability(dateText, container);
			// Stocker la date dans un cookie
			document.cookie =
				"selected_date_clapi=" + dateText + "; path=/; max-age=86400"; // 86400 secondes = 1 jour
			$("#clapidatevalue").text(dateText);
		},
	});

	//FIN DE SELECTION DE DATE pour les CLAPIOTTES

	//SELECTION DE DATE pour LE BRUNCH

	// Pour le Brunch
	function getNextAvailableDateBrunch() {
		const today = new Date();
		let nextDay = new Date(today);
		nextDay.setDate(today.getDate() + 1);

		while ([4, 5, 6].indexOf(nextDay.getDay()) === -1) {
			nextDay.setDate(nextDay.getDate() + 1);
		}

		return nextDay;
	}

	const defaultDateBrunch = getNextAvailableDateBrunch();
	const formattedDateBrunch = defaultDateBrunch.toLocaleDateString(
		"fr-FR",
		options,
	);

	function setDefaultDateCookieIfNotExistBrunch() {
		const cookieArray = document.cookie.split(";");
		const cookieName = "selected_date_brunch=";
		let cookieExists = false;

		for (let i = 0; i < cookieArray.length; i++) {
			let cookie = cookieArray[i];
			while (cookie.charAt(0) === " ") {
				cookie = cookie.substring(1);
			}
			if (cookie.indexOf(cookieName) === 0) {
				cookieExists = true;
				break;
			}
		}

		if (!cookieExists) {
			document.cookie =
				"selected_date_brunch=" +
				formattedDateBrunch +
				"; path=/; max-age=86400";
		}
	}

	setDefaultDateCookieIfNotExistBrunch();

	$("#delivery_date_brunch").datepicker({
		minDate: "+1d",
		beforeShowDay: function (date) {
			const dayOfWeek = date.getDay();
			return [dayOfWeek === 0 || dayOfWeek === 6];
		},
		onSelect: function (dateText) {
			const container = $(".whencontainerbrunch");
			checkAvailabilityBrunch(dateText, container);

			document.cookie =
				"selected_date_brunch=" + dateText + "; path=/; max-age=86400";
			$("#brunchdatevalue").text(dateText);
		},
	});
	// Définir la date par défaut dans le champ de Brunch
	$("#delivery_date_brunch").val(formattedDateBrunch);
	// Ligne ajoutée pour annuler la sélection par défaut
	$("#delivery_date_brunch").datepicker("setDate", null);

	//FIN DE SELECTION DE DATE pour LE BRUNCH

	// Initialisation des datepickers lors du chargement de la page
	initializeClapiDatePicker();
	initializeBrunchDatePicker();

	//VERIF DISPO PRODUIT
	//ON DECLARE LE BOUTON CHECKOUT
	var checkoutButton = $(".checkout-button.button.alt.wc-forward");

	//Verification de la disponibilité des produits POUR LES CLAPIOTTES
	const checkAvailability = function (date, container) {
		$.ajax({
			url: "https://les-clapiottes.fr/wp-admin/admin-ajax.php",
			type: "POST",
			data: {
				action: "check_availability",
				selected_date_clapi: date,
			},
			success: function (response) {
				var data = JSON.parse(response);
				console.log("Réponse AJAX CLAPIOTTES : " + response);
				console.log("Données JSON CLAPIOTTES : ", data);

				if (data.status === "error") {
					console.error("Erreur : " + data.message);
					container.find(".onlyleft").text("Il n y a plus de couverts !");
					checkoutButton.css("background-color", "#ff0000"); // Fond rouge
					checkoutButton.css("color", "#fff"); // Texte en blanc
					checkoutButton.css("pointer-events", "none"); // Désactiver le clic
				} else if (data.status === "success") {
					const availableStockForDay = parseInt(data.available_stock, 10);
					container
						.find(".onlyleft")
						.text("Il reste " + data.available_clapi_stock + " couverts");
				}
			},
			error: function (error) {
				console.error("Statut échec", error);
			},
		});
	};

	// Définir la date par défaut dans le champ
	$("#delivery_date_clapi").val(formattedDate);
	// Ligne ajoutée pour annuler la sélection par défaut
	$("#delivery_date_clapi").datepicker("setDate", null);
	// Stocker la date par défaut dans un cookie

	//FIN DE LA Verification de la disponibilité des produits POUR LES CLAPIOTTEs

	//Verification de la disponibilité des produits POUR LE BRUNCH
	//A RETRAVAILLER GDM PIXEL ET FAUDRA FAIRE LA MEME POUR LES CLAPIOTTES
	// C EST LA SECTION POUR DESACTIVER LE BOUTON DE COMMANDE SI Y A PLUS DE STOCK
	const checkAvailabilityBrunch = function (date, container) {
		$.ajax({
			url: "https://les-clapiottes.fr/wp-admin/admin-ajax.php",
			type: "POST",
			data: {
				action: "check_availability_brunch",
				selected_date_brunch: date,
			},
			success: function (response) {
				const data = JSON.parse(response);
				console.log("Réponse AJAX Brunch : " + response);
				console.log("Données JSON Brunch : ", data);
				if (data.status === "error") {
					console.error("Erreur : " + data.message);
					// Sélectionnez le bouton par son sélecteur CSS
					checkoutButton.css("background-color", "#ff0000"); // Fond rouge
					checkoutButton.css("color", "#fff"); // Texte en blanc
					checkoutButton.css("pointer-events", "none"); // Désactiver le clic
					container.find(".onlyleft").text("Il n y a plus de couverts !");
				} else if (data.status === "success") {
					checkoutButton.css("pointer-events", "all"); // Désactiver le clic
					const availableStockForDay = parseInt(data.available_brunch_stock, 10);
					container
						.find(".onlyleft")
						.text("Il reste " + data.available_brunch_stock + " couverts");
				}
			},
			error: function (error) {
				console.error("Statut échec", error);
			},
		});
		//FIN DE LA Verification de la disponibilité des produits POUR LE BRUNCH
	};

	// Écouteur d'événement pour la mise à jour du panier
	$(document.body).on("updated_wc_div", function () {
		console.log("Le panier a été mis à jour"); // Pour le débogage

		// Détruire les anciens datepickers
		$("#delivery_date_clapi").datepicker("destroy");
		$("#delivery_date_brunch").datepicker("destroy");

		// Réinitialiser les valeurs par défaut
		const defaultDate = getNextAvailableDate();
		const formattedDate = defaultDate.toLocaleDateString("fr-FR", options);
		const defaultDateBrunch = getNextAvailableDateBrunch();
		const formattedDateBrunch = defaultDateBrunch.toLocaleDateString(
			"fr-FR",
			options,
		);

		// Réinitialiser les datepickers
		initializeClapiDatePicker();
		initializeBrunchDatePicker();


	});
});
