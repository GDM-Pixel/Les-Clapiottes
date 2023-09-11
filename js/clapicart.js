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

	}

	//NOUVEL AJOUT GDM
	function getCookie(name) {
		const value = "; " + document.cookie;
		const parts = value.split("; " + name + "=");
		if (parts.length === 2) return parts.pop().split(";").shift();
	}

	const existingDateClapi = getCookie('selected_date_clapi');
	// Code existant pour obtenir la date par défaut

	const defaultDateClapi = existingDateClapi || getNextAvailableDateClapi();
	let formattedDateClapi;

	if (typeof defaultDateClapi === 'object' && defaultDateClapi instanceof Date) {
		const options = { day: "numeric", month: "long", year: "numeric" };
		formattedDateClapi = defaultDateClapi.toLocaleDateString("fr-FR", options);
	} else {
		formattedDateClapi = defaultDateClapi; // ici, defaultDateClapi est déjà une chaîne
	}

	// Formater la date dans le format que vous souhaitez
	//const options = { day: "numeric", month: "long", year: "numeric" };
	//const formattedDateClapi = defaultDateClapi.toLocaleDateString(
	//	"fr-FR",
	//	options,
	//);

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
		defaultDate: defaultDateClapi,
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

	//ON A DEJA LA FONCTION POUR RECUPERER LE NOM DU COOKIE

	const existingDateBrunch = getCookie('selected_date_brunch');
	// Code existant pour obtenir la date par défaut


	const defaultDateBrunch = existingDateBrunch || getNextAvailableDateBrunch();
	let formattedDateBrunch;

	if (typeof defaultDateBrunch === 'object' && defaultDateBrunch instanceof Date) {
		const options = { day: "numeric", month: "long", year: "numeric" };
		formattedDateBrunch = defaultDateBrunch.toLocaleDateString("fr-FR", options);
	} else {
		formattedDateBrunch = defaultDateBrunch; // ici, defaultDateBrunch est déjà une chaîne
	}

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
		defaultDate: defaultDateBrunch,
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
				console.log("Réponse AJAX : " + response);
				console.log("Données JSON : ", data);

				if (data.status === "error") {
					console.error("Erreur : " + data.message);
					containerclapi
						.find(".leftunit")
						.text("Il ne reste plus rien pour cette date :(");
					const buttonClapiCart = $(".clapitab .add_to_cart_button");
					buttonClapiCart.addClass("button-error");
					buttonClapiCart.text("Yen a plus !");
				} else if (data.status === "success") {

					if (typeof cart_counts !== "undefined") {
						// Vérifie que cart_counts est défini
						if (cart_counts.clapiottes > 0) {
							$(".clapitab .qtity").attr("min", 1);
						} else {
							$(".clapitab .qtity").attr("min", 2); // ou toute autre valeur par défaut
						}
					}
					
					containerclapi
						.find(".leftunit")
						.text("Il reste " + data.available_clapi_stock + " unités");
					const buttonClapiCart = $(".clapitab .add_to_cart_button");
					buttonClapiCart.removeClass("button-error");
					buttonClapiCart.text("Au panier !");
					const clapi_in_cart = data.count_clapiottes_in_cart;
					const available_clapi_stock = data.available_clapi_stock;
					new_clapi_max_value = available_clapi_stock - clapi_in_cart;
					if (new_clapi_max_value <= 0) {
						buttonClapiCart.addClass("button-error");
						buttonClapiCart.text("Yen a plus !");
					};
					$('input[name="quantity"].qtity.clapitab-qty').attr("max", new_clapi_max_value,);

					console.log("NOMBRE DE CLAPI DANS LE PANIER = " + clapi_in_cart + " et Nouvelle valeur MAX " + new_clapi_max_value);

					$(document).trigger("clapi_max_value_updated");

					if (clapiCartButtonClicked) {
						$('input[name="quantity"].qtity.clapitab-qty').each(function () {
							// Mettre à jour l'attribut 'max'
							$(this).attr("max", new_clapi_max_value);
							const currentQuantity = parseInt($(this).val(), 10);
							// Si la valeur actuelle est supérieure au max, ajustez-la

							if (!isNaN(currentQuantity) && currentQuantity > 0 && currentQuantity > new_clapi_max_value) {
								$(this).val(new_clapi_max_value);
							}
						});
						if (clapi_in_cart > 0) {
							$(".clapitab .qtity.clapitab-qty").attr("min", "1");
						};
						clapiCartButtonClicked = false; // Remettre la variable à false
					};

				}
			},
			error: function (error) {
				console.error("Statut échec", error);
			},
		});
	};

	

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

					
					if (typeof cart_counts !== "undefined") {
						// Vérifie que cart_counts est défini
						if (cart_counts.brunch > 0) {
							$(".brunchtab .qtity").attr("min", 1);
						} else {
							$(".brunchtab .qtity").attr("min", 2);
							console.log("CA MARCHE");
						}
					}

					containerbrunch
						.find(".leftunit")
						.text("Il reste " + data.available_brunch_stock + " unités");
					const buttonBrunchCart = $(".brunchtab .add_to_cart_button");
					buttonBrunchCart.removeClass("button-error");
					buttonBrunchCart.text("Au panier !");
					const brunch_in_cart = data.count_brunch_in_cart;
					const available_brunch_stock = data.available_brunch_stock;
					new_brunch_max_value = available_brunch_stock - brunch_in_cart;
					if (new_brunch_max_value <= 0) {
						buttonBrunchCart.addClass("button-error");
						buttonBrunchCart.text("Yen a plus !");
					};
					$('input[name="quantity"].qtity.brunchtab-qty').attr("max", new_brunch_max_value,);

					console.log("NOMBRE DE BRUNCH DANS LE PANIER = " + brunch_in_cart + " et Nouvelle valeur MAX " + new_brunch_max_value);

					$(document).trigger("clapi_max_value_updated");

					if (brunchCartButtonClicked) {
						$('input[name="quantity"].qtity.brunchtab-qty').each(function () {
							// Mettre à jour l'attribut 'max'
							$(this).attr("max", new_brunch_max_value);
							const currentQuantity = parseInt($(this).val(), 10);
							// Si la valeur actuelle est supérieure au max, ajustez-la
							if (!isNaN(currentQuantity) && currentQuantity > 0 && currentQuantity > new_brunch_max_value) {
								$(this).val(new_brunch_max_value);
							} 
						});
						if (brunch_in_cart > 0) {
							$(".brunchtab .qtity.brunchtab-qty").attr("min", "1");};
						brunchCartButtonClicked = false; // Remettre la variable à false
					};

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


	let clapiCartButtonClicked = false; 
	//On remet à jour le compte de produit dispo quand on valide le panier :
	$(document).on("click", ".clapitab .add_to_cart_button", function () {
		clapiCartButtonClicked = true;
		setTimeout(function () {
			// Récupérer la date depuis le cookie
			let selectedDateClapi = getCookie("selected_date_clapi");
			checkAvailabilityClapi(
				selectedDateClapi || formattedDateClapi,
				containerclapi
			);
			console.log("new_clapi_max_value pour voir car bouton panier cliqué = " + new_clapi_max_value); 
	
		}, 500); 
	});

	let brunchCartButtonClicked = false; 
	//On remet à jour le compte de produit dispo quand on valide le panier :
	$(document).on("click", ".brunchtab .add_to_cart_button", function () {
		brunchCartButtonClicked = true;
		setTimeout(function () {
			// Récupérer la date depuis le cookie
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

