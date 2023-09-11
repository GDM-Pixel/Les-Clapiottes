jQuery(document).ready(function ($) {
	//SELECTION DE DATE pour les CLAPIOTTES

	function getNextAvailableDateClapi() {
		const today = new Date();
		let nextDay = new Date(today);
		nextDay.setDate(today.getDate() + 1);

		while ([4, 5, 6].indexOf(nextDay.getDay()) === -1) {
			nextDay.setDate(nextDay.getDate() + 1);
		}

		return nextDay;
		//com de test
	}

	const defaultDateClapi = getNextAvailableDateClapi();

	// Formater la date dans le format que vous souhaitez
	const options = { day: "numeric", month: "long", year: "numeric" };
	const formattedDateClapi = defaultDateClapi.toLocaleDateString(
		"fr-FR",
		options,
	);

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
				"selected_date_clapi=" + formattedDateClapi + "; path=/; max-age=86400"; // 86400 secondes = 1 jour
		}
	}

	// Appel de la nouvelle fonction pour vérifier le cookie
	setDefaultDateCookieIfNotExist();
	const containerclapi = $(".whencontainerclapiottes");
	// Initialisation du datepicker
	$("#delivery_date_clapi").datepicker({
		minDate: "+1d",
		beforeShowDay: function (date) {
			const dayOfWeek = date.getDay();
			return [dayOfWeek === 4 || dayOfWeek === 5 || dayOfWeek === 6];
		},
		onSelect: function (dateText) {
			checkAvailabilityClapi(dateText, containerclapi);

			// Stocker la date dans un cookie
			document.cookie =
				"selected_date_clapi=" + dateText + "; path=/; max-age=86400"; // 86400 secondes = 1 jour
		},
	});
	//FIN DE SELECTION DE DATE pour les CLAPIOTTES

	//SELECTION DE DATE pour LE BRUNCH

	// Pour le Brunch
	function getNextAvailableDateBrunch() {
		const today = new Date();
		let nextDay = new Date(today);
		nextDay.setDate(today.getDate() + 1);

		while ([6, 0].indexOf(nextDay.getDay()) === -1) {
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
	const containerbrunch = $(".whencontainerbrunch");
	$("#delivery_date_brunch").datepicker({
		minDate: "+1d",
		beforeShowDay: function (date) {
			const dayOfWeek = date.getDay();
			return [dayOfWeek === 0 || dayOfWeek === 6];
		},
		onSelect: function (dateText) {
			checkAvailabilityBrunch(dateText, containerbrunch); // Remplacé ici

			document.cookie =
				"selected_date_brunch=" + dateText + "; path=/; max-age=86400";
		},
	});

	//FIN DE SELECTION DE DATE pour LE BRUNCH

	

	//Verification de la disponibilité des produits POUR LES CLAPIOTTES
	let new_clapi_max_value; 
	const checkAvailabilityClapi = function (date, containerclapi) {
		$.ajax({
			url: "https://les-clapiottes.fr/wp-admin/admin-ajax.php",
			type: "POST",
			data: {
				action: "check_availability",
				selected_date_clapi: date,
			},
			success: function (response) {
				var data = JSON.parse(response);
				console.log("Réponse AJAX CLAPIOTTES INTIALISATION : " + response);
				console.log("Données JSON CLAPIOTTES INTIALISATION: ", data);

				if (data.status === "error") {
					console.error("Erreur : " + data.message);
					containerclapi
						.find(".leftunit")
						.text("Il ne reste plus rien pour cette date :(");
					const buttonClapiCart = $(".clapitab .add_to_cart_button");
					buttonClapiCart.addClass("button-error");
					buttonClapiCart.text("Yen a plus !");
				} else if (data.status === "success") {
					containerclapi
						.find(".leftunit")
						.text("Il reste " + data.available_clapi_stock + " unités");
					const buttonClapiCart = $(".clapitab .add_to_cart_button");
					buttonClapiCart.removeClass("button-error");
					buttonClapiCart.text("Au panier !");
					const clapi_in_cart = data.count_clapiottes_in_cart;
					const available_clapi_stock = data.available_clapi_stock;
					new_clapi_max_value = available_clapi_stock - clapi_in_cart;
					console.log("new_clapi_max_value dans la fonction = " + new_clapi_max_value,);
					$('input[name="quantity"].qtity.clapitab-qty').attr("max",new_clapi_max_value,);
					console.log("NOMBRE DE CLAPI DANS LE PANIER = " + clapi_in_cart,);
				}
			},
			error: function (error) {
				console.error("Statut échec", error);
			},
		});
	};

	//SI cart_counts.clapiottes > 1 ALORS $(.clapitab .qtity).attr("min", 1)
	if (typeof cart_counts !== "undefined") {
		// Vérifie que cart_counts est défini
		if (cart_counts.clapiottes > 0) {
			$(".clapitab .qtity").attr("min", 1);
		} else {
			$(".clapitab .qtity").attr("min", 2); // ou toute autre valeur par défaut
		}
		if (cart_counts.brunch > 0) {
			$(".brunchtab .qtity").attr("min", 1);
		} else {
			$(".brunchtab .qtity").attr("min", 2); // ou toute autre valeur par défaut
		}
	}

	// Définir la date par défaut dans le champ
	$("#delivery_date_clapi").val(formattedDateClapi);
	// Stocker la date par défaut dans un cookie

	// Vérifier la disponibilité pour la date par défaut

	checkAvailabilityClapi(formattedDateClapi, containerclapi);

	//FIN DE LA Verification de la disponibilité des produits POUR LES CLAPIOTTEs
    
	//Verification de la disponibilité des produits POUR LE BRUNCH
	let new_brunch_max_value;
	const checkAvailabilityBrunch = function (date, containerbrunch) {
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
					containerbrunch
						.find(".leftunit")
						.text("Il ne reste plus rien pour cette date :(");
					const buttonBrunchCart = $(".brunchtab .add_to_cart_button");
					buttonBrunchCart.addClass("button-error");
					buttonBrunchCart.text("Yen a plus !");
				} else if (data.status === "success") {
					containerbrunch
						.find(".leftunit")
						.text("Il reste " + data.available_brunch_stock + " unités");
					const buttonBrunchCart = $(".brunchtab .add_to_cart_button");
					buttonBrunchCart.removeClass("button-error");
					buttonBrunchCart.text("Au panier !");
					const brunch_in_cart = data.count_brunch_in_cart;
					const available_brunch_stock = data.available_brunch_stock;
					new_brunch_max_value = available_brunch_stock - brunch_in_cart;
					$('input[name="quantity"].qtity.brunchtab-qty').attr("max",new_brunch_max_value,);
					console.log("NOMBRE DE BRUNCH DANS LE PANIER = " + brunch_in_cart);
				}
			},
			error: function (error) {
				console.error("Statut échec", error);
			},
		});

		//FIN DE LA Verification de la disponibilité des produits POUR LE BRUNCH
	};

	$("#delivery_date_brunch").val(formattedDateBrunch);
	// Vérifier la disponibilité pour la date par défaut de Brunch
	checkAvailabilityBrunch(formattedDateBrunch, containerbrunch);

	// Fonction pour mettre à jour la quantité et le prix
	const updateCart = function () {
		const cartUpdater = $(this).closest(".cartupdater");
		const quantity = $(this).val();
		const productId = cartUpdater.data("product-id");

		const unitPrice = parseFloat(
			cartUpdater.find(".dynamicprice").data("unit-price"),
		);
		const newTotalPrice = (unitPrice * quantity).toFixed(2);

		cartUpdater
			.find(`a[data-product_id="${productId}"]`)
			.attr("data-quantity", quantity);
		cartUpdater.find(".dynamicprice").text(newTotalPrice);
	};

	//On remet à jour le compte de produit dispo quand on valide le panier :
	$(document).on("click", ".clapitab .add_to_cart_button", function () {
		setTimeout(function () {
			// Récupérer la date depuis le cookie
			let selectedDateClapi = getCookie("selected_date_clapi"); // Vous devrez implémenter la fonction getCookie
			checkAvailabilityClapi(
				selectedDateClapi || formattedDateClapi,
				containerclapi,
			); // Utiliser la date du cookie, ou la date par défaut si le cookie n'est pas défini
			console.log("fonction de vérif Clapi relancée");
		}, 500);
	});

	//On remet à jour le compte de produit dispo quand on valide le panier :
	$(document).on("click", ".brunchtab .add_to_cart_button", function () {
		setTimeout(function () {
			let selectedDateBrunch = getCookie("selected_date_brunch");
			checkAvailabilityBrunch(
				selectedDateBrunch || formattedDateBrunch,
				containerbrunch,
			);
			console.log("fonction de vérif Brunch relancée");
		}, 500);
	});

	// Exemple de fonction pour récupérer un cookie par son nom
	function getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	// Fonction pour afficher le popup après ajout au panier
	const showPopupOnAddedToCart = function (
		event,
		fragments,
		cart_hash,
		$button,
	) {
		const productName = $button.closest(".cartupdater").data("product-name");
		$(".added-product-name").text(productName);
		$(".popup-overlay").fadeIn();
	};

	// Fonction pour fermer la popup
	const closePopup = function () {
		$(".popup-overlay").fadeOut();
	};

	// Écouteurs d'événements
	$(".cartupdater .qtity").on("change", updateCart);
	$(document.body).on("added_to_cart", showPopupOnAddedToCart);
	$(".popup-overlay").on("click", function (event) {
		if ($(event.target).closest(".clapipopup").length === 0) closePopup();
	});
	$(".close-popup").on("click", closePopup);

	console.log("CLAPIOTTE PANIER = " + cart_counts.clapiottes);
	console.log("BRUNCH PANIER = " + cart_counts.brunch);
});

