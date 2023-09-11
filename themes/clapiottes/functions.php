<?php

/**
 * GeneratePress child theme functions and definitions.
 *
 * Add your custom PHP in this file.
 * Only edit this file if you have direct access to it on your server (to fix errors if they happen).
 */

add_action('wp_enqueue_scripts', 'enqueue_parent_styles');
function enqueue_parent_styles()
{
   wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
}

add_action('wp_enqueue_scripts', 'enqueue_custom_styles');
function enqueue_custom_styles()
{
   wp_enqueue_style('custom-style', get_stylesheet_directory_uri() . '/custom.css');
}


//ON DEGREFFE LE OPEN SANS DE WP GRID
function remove_google_fonts_stylesheet()
{
   wp_dequeue_style('wpgb-fonts');
}
add_action('wp_enqueue_scripts', 'remove_google_fonts_stylesheet', 999);

//ON DEGREFFE LE OLD FONT AWESOME de GeneratePress
function remove_font_awesome_gp()
{
   wp_dequeue_style('font-awesome');
}
add_action('wp_enqueue_scripts', 'remove_font_awesome_gp', 997);

//AJOUT FEUILLE DE STYLE ADMIN
add_action('admin_enqueue_scripts', 'my_admin_style');
function my_admin_style()
{
   wp_enqueue_style('admin-style', get_stylesheet_directory_uri() . '/admin-style.css');
}

//ON SUPPRIME AUTO P sur les pages
// Prevent WP from adding <p> tags on pages
function disable_wp_auto_p($content)
{
   if (is_singular('page') || is_singular('post_type_landing')) {
      remove_filter('the_content', 'wpautop');
      remove_filter('the_excerpt', 'wpautop');
   }
   return $content;
}
add_filter('the_content', 'disable_wp_auto_p', 0);

//ON CREE LE FORMAT "THUMB" POUR LES IMAGES
function custom_image_sizes()
{
   add_image_size('thumb', 640, 360, true);
}
add_action('after_setup_theme', 'custom_image_sizes');



//ON CREE LE SHORTCODE POUR LE PORTFOLIO
function custom_portfolio_shortcode($atts)
{
   $atts = shortcode_atts(array(
      'alt' => 'IMG-ALT'
   ), $atts);

   $output = '<ul>'; // Start the unordered list

   for ($i = 1; $i <= 6; $i++) {
      $image_field_name = 'gallery_home_' . $i;
      $image = get_field($image_field_name);

      if ($image && is_array($image)) {
         $image_url = $image['url'];
         $image_width = $image['width'];
         $image_height = $image['height'];
         $thumbnail_url = $image['sizes']['thumb'];
         $image_alt = $image['alt'] ? $image['alt'] : $atts['alt'];

         $output .= '<li class="portfoliome" data-fancybox="clapiottesportfolio" ';
         $output .= 'data-src="' . esc_attr($image_url) . '" ';
         $output .= 'data-width="' . esc_attr($image_width) . '" ';
         $output .= 'data-height="' . esc_attr($image_height) . '">';
         $output .= '<img decoding="async" class="pfthumb lazy-loaded" ';
         $output .= 'alt="' . esc_attr($image_alt) . '" ';
         $output .= 'src="' . esc_attr($thumbnail_url) . '" ';
         $output .= 'data-lazy-type="image" data-src="' . esc_attr($thumbnail_url) . '" />';
         $output .= '</li>'; // Close the <li> for this image
      }
   }

   $output .= '</ul>'; // End the unordered list

   return $output;
}
add_shortcode('custom_portfolio', 'custom_portfolio_shortcode');

//ON AJOUTE LE SUPPORT DES TAGS POUR LES IMAGES
function add_tags_to_attachments()
{
   register_taxonomy_for_object_type('post_tag', 'attachment');
}
add_action('init', 'add_tags_to_attachments');

//PANIER AJAX
function add_to_cart()
{
   $product_id = $_POST['product_id'];
   $quantity = $_POST['quantity'];

   $cart_item_key = WC()->cart->add_to_cart($product_id, $quantity);

   if ($cart_item_key) {
      $cart_total = WC()->cart->get_cart_total();
      $cart_count = WC()->cart->get_cart_contents_count();

      wp_send_json_success([
         'cart_total' => $cart_total,
         'cart_count' => $cart_count
      ]);
   } else {
      wp_send_json_error();
   }

   wp_die();
}

add_action('wp_ajax_add_to_cart', 'add_to_cart');
add_action('wp_ajax_nopriv_add_to_cart', 'add_to_cart');

//ON AJOUTE UN ENDPOINT POUR LE PANIER
add_action('rest_api_init', function () {
   register_rest_route('clapiottes/v1', 'cart', array(
      'methods' => 'GET',
      'callback' => 'get_cart_data',
   ));
});


//ON DESACTIVE L EDITEUR VISUEL POUR LES PAGES
function disable_visual_editor_for_pages($can)
{
   global $post;

   if ('page' == get_post_type($post)) {
      return false;
   }

   return $can;
}
add_filter('user_can_richedit', 'disable_visual_editor_for_pages');

//ON DESACTIVE LES COMMENTAIRES PARTOUT
function disable_comments_everywhere()
{
   // Désactiver le support des commentaires pour les types de posts
   $post_types = get_post_types();
   foreach ($post_types as $post_type) {
      remove_post_type_support($post_type, 'comments');
   }

   // Fermer les commentaires sur les pages existantes
   update_option('default_comment_status', 'closed');
}
add_action('init', 'disable_comments_everywhere');


//ON AJUSTE LE TRESHOLD DE WP ROCKET
function rocket_lazyload_custom_threshold($threshold)
{
   return 100;
}
add_filter('rocket_lazyload_threshold', 'rocket_lazyload_custom_threshold');

//ON AJOUTE JQUERY UI DATE PICKER
function enqueue_jquery_ui()
{
   // Enregistrez et incluez le jQuery UI datepicker
   wp_enqueue_script('jquery-ui-datepicker');

   // Inclure le CSS pour le jQuery UI
   wp_enqueue_style('jquery-ui-css', 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.min.css');
}

add_action('wp_enqueue_scripts', 'enqueue_jquery_ui');

//VERIFICATION DE DISPO POUR LES CLAPIOTTES
add_action('wp_ajax_check_availability', 'check_availability');
add_action('wp_ajax_nopriv_check_availability', 'check_availability');


function check_availability()
{
   global $wpdb;
   global $woocommerce; 
   // Réception des données POST
   $received_date = $_POST['selected_date_clapi'];

   // Nouvelle variable pour compter les produits de la catégorie "clapiottes" dans le panier
   $count_clapiottes_in_cart = 0;

   // Parcours du panier pour compter les produits de la catégorie "clapiottes"
   foreach ($woocommerce->cart->get_cart() as $cart_item_key => $cart_item) {
      $product = $cart_item['data'];
      if (has_term('clapiottes', 'product_cat', $product->get_id())) {
         $count_clapiottes_in_cart += $cart_item['quantity'];
      }
   }

   

   // Validation et reformatage de la date
   // Fonction de reformatage de la date intégrée ici
   $months = [
      'janvier' => '01',
      'février' => '02',
      'mars' => '03',
      'avril' => '04',
      'mai' => '05',
      'juin' => '06',
      'juillet' => '07',
      'août' => '08',
      'septembre' => '09',
      'octobre' => '10',
      'novembre' => '11',
      'décembre' => '12'
   ];

   $dateComponents = explode(" ", $received_date);
   $day = str_pad($dateComponents[0], 2, '0', STR_PAD_LEFT);
   $month = $months[strtolower($dateComponents[1])];
   $year = $dateComponents[2];
   $selected_date_clapi = "$year-$month-$day";

   // Requête à la base de données pour obtenir le stock disponible
   $available_clapi_stock = $wpdb->get_var($wpdb->prepare(
      "SELECT production_capacity FROM wp_clapiresa WHERE reservation_date = %s",
      $selected_date_clapi
   ));

   // Si la date n'est pas trouvée, considérer que le stock disponible est de 20
   if ($available_clapi_stock === null) {
      $available_clapi_stock = 20;

      // Insérer une nouvelle ligne dans la base de données pour cette date
      $wpdb->insert(
         'wp_clapiresa',
         [
            'reservation_date' => $selected_date_clapi,
            'production_capacity' => $available_clapi_stock
         ],
         ['%s', '%d']
      );
   }

   // Vérification de la disponibilité
   if ($available_clapi_stock > 0) {
      echo json_encode(['status' => 'success', 'message' => 'Disponible CLAPI', 'available_clapi_stock' => $available_clapi_stock, 'selected_date_clapi' => $selected_date_clapi, 'count_clapiottes_in_cart' => $count_clapiottes_in_cart]);
   } else {
      echo json_encode(['status' => 'error', 'message' => 'Stock insuffisant CLAPI', 'available_clapi_stock' => $available_clapi_stock, 'selected_date_clapi' => $selected_date_clapi, 'count_clapiottes_in_cart' => $count_clapiottes_in_cart]);
   }
   WC()->session->set('selected_date_clapi', $selected_date_clapi);
   wp_die();
}
//FIN DE LA VERIFICATION DE DISPO POUR LES CLAPIOTTES

//ON RECUPERE LES CLAPIOTTES ET LE BRUNCH DU PANIER

add_action('wp_enqueue_scripts', 'count_products_in_cart_by_category');

function count_products_in_cart_by_category()
{
   // Vérification de la page sur laquelle nous sommes
   if (is_front_page() || is_page('plateaux-aperitifs-caen') || is_page('brunch-caen')) {
   global $woocommerce;
   $cart_items = $woocommerce->cart->get_cart();
   $count_clapiottes = 0;
   $count_brunch = 0;

   foreach ($cart_items as $cart_item_key => $cart_item) {
      $product = $cart_item['data'];

      // Comptabiliser les produits de la catégorie "Clapiottes"
      if (has_term('clapiottes', 'product_cat', $product->get_id())) {
         $count_clapiottes += $cart_item['quantity'];
      }
      // Comptabiliser les produits de la catégorie "Brunch"
      if (has_term('brunch', 'product_cat', $product->get_id())) {
         $count_brunch += $cart_item['quantity'];
      }
   }
   
   // Ajout des variables JavaScript
   
   wp_enqueue_script('recupe-produits-panier', '/assets/js/clapicart.js', array('jquery'), '', true);
    
   wp_localize_script('recupe-produits-panier', 'cart_counts', array(
      'clapiottes' => $count_clapiottes,
      'brunch' => $count_brunch,
   ));
 }
}



// VERIFICATION DE DISPO POUR LE BRUNCH

add_action('wp_ajax_check_availability_brunch', 'check_availability_brunch');
add_action('wp_ajax_nopriv_check_availability_brunch', 'check_availability_brunch');


function check_availability_brunch()
{
   global $wpdb;
   global $woocommerce; 
   // Réception des données POST
   $received_date = $_POST['selected_date_brunch'];

   // Nouvelle variable pour compter les produits de la catégorie "clapiottes" dans le panier
   $count_brunch_in_cart = 0;

   // Parcours du panier pour compter les produits de la catégorie "clapiottes"
   foreach ($woocommerce->cart->get_cart() as $cart_item_key => $cart_item) {
      $product = $cart_item['data'];
      if (has_term('brunch', 'product_cat', $product->get_id())) {
         $count_brunch_in_cart += $cart_item['quantity'];
      }
   }

   // Validation et reformatage de la date
   $months = [
      'janvier' => '01',
      'février' => '02',
      'mars' => '03',
      'avril' => '04',
      'mai' => '05',
      'juin' => '06',
      'juillet' => '07',
      'août' => '08',
      'septembre' => '09',
      'octobre' => '10',
      'novembre' => '11',
      'décembre' => '12'
   ];

   $dateComponents = explode(" ", $received_date);
   $day = str_pad($dateComponents[0], 2, '0', STR_PAD_LEFT);
   $month = $months[strtolower($dateComponents[1])];
   $year = $dateComponents[2];
   $selected_date_brunch = "$year-$month-$day";

   // Requête à la base de données pour obtenir le stock disponible
   $available_brunch_stock = $wpdb->get_var($wpdb->prepare(
      "SELECT production_capacity FROM wp_brunchresa WHERE reservation_date = %s",
      $selected_date_brunch
   ));

   // Si la date n'est pas trouvée, considérer que le stock disponible est de 20
   if ($available_brunch_stock === null) {
      $available_brunch_stock = 20;

      // Insérer une nouvelle ligne dans la base de données pour cette date
      $wpdb->insert(
         'wp_brunchresa',
         [
            'reservation_date' => $selected_date_brunch,
            'production_capacity' => $available_brunch_stock
         ],
         ['%s', '%d']
      );
   }

   // Vérification de la disponibilité
   if ($available_brunch_stock > 0) {
      echo json_encode(['status' => 'success', 'message' => 'Disponible BRUNCH', 'available_brunch_stock' => $available_brunch_stock, 'selected_date_brunch' => $selected_date_brunch, 'count_brunch_in_cart' => $count_brunch_in_cart]);
   } else {
      echo json_encode(['status' => 'error', 'message' => 'Stock insuffisant BRUNCH', 'available_brunch_stock' =>$available_brunch_stock, 'selected_date_brunch' =>$selected_date_brunch, 'count_brunch_in_cart' => $count_brunch_in_cart]);
   }
   WC()->session->set('selected_date_brunch', $selected_date_brunch);
   wp_die();
}

//FIN DE LA VERIFICATION DE DISPO POUR LE BRUNCH


//ON AJOUTE LE COOKIE POUR LES CLAPIOTTES

add_action('woocommerce_checkout_update_order_meta', 'save_selected_date_clapi_to_order_meta_clapi');

function save_selected_date_clapi_to_order_meta_clapi($order_id)
{
   if (isset($_COOKIE['selected_date_clapi'])) {
      $selected_date_clapi = sanitize_text_field($_COOKIE['selected_date_clapi']);
      update_post_meta($order_id, '_selected_date_clapi', $selected_date_clapi);
   }
}

//ON AJOUTE LE COOKIE POUR LE BRUNCH

add_action('woocommerce_checkout_update_order_meta', 'save_selected_date_brunch_to_order_meta_brunch');

function save_selected_date_brunch_to_order_meta_brunch($order_id)
{
   if (isset($_COOKIE['selected_date_brunch'])) {
      $selected_date_brunch = sanitize_text_field($_COOKIE['selected_date_brunch']);
      update_post_meta($order_id, '_selected_date_brunch', $selected_date_brunch);
   }
}

//ON TEST AJOUT DATES DANS LE PANIER
add_action('clapiodeliverlastchance', 'verif_presence_panier', 10, 2);

function verif_presence_panier($selected_date_clapi, $selected_date_brunch)
{

   $clapi_in_cart = false;
   $brunch_in_cart = false;

   // Vérifie si les produits de catégorie "Clapiottes" ou "Brunch" sont dans le panier.
   foreach (WC()->cart->get_cart() as $cart_item) {
      $product_id = $cart_item['product_id'];
      if (has_term('Clapiottes', 'product_cat', $product_id)) {
         $clapi_in_cart = true;
      }
      if (has_term('Brunch', 'product_cat', $product_id)) {
         $brunch_in_cart = true;
      }
   }

   // Affiche la date de livraison seulement si les produits correspondants sont dans le panier
   if ($clapi_in_cart && $selected_date_clapi) {
      echo '<div id="clapioresadate">Pour vos Clapiottes : <span id="clapidatevalue">' . esc_html($selected_date_clapi)  . '</span></div>';
   }

   if ($brunch_in_cart && $selected_date_brunch) {
      echo '<div id="brunchresadate">Pour votre Brunch : <span id="brunchdatevalue">' . esc_html($selected_date_brunch) . '</span></div>';
   }
}



//ON AFFICHE LES DATES DANS LA VALIDATION DE COMMANDE

function display_selected_date_clapi_in_checkout()
{
   global $woocommerce;
   $clapi_in_cart = false;

   foreach ($woocommerce->cart->get_cart() as $cart_item_key => $cart_item) {
      $_product = $cart_item['data'];
      if (has_term('Clapiottes', 'product_cat', $_product->get_id())) {
         $clapi_in_cart = true;
         break;
      }
   }

   if ($clapi_in_cart && isset($_COOKIE['selected_date_clapi'])) {
      $selected_date_clapi = $_COOKIE['selected_date_clapi'];
      echo '<span class="selected-date-checkout">';
      echo 'Date de livraison choisie pour vos Clapiottes : ' . esc_html($selected_date_clapi);
      echo '</span>';
   }
}
add_action('woocommerce_checkout_before_order_review', 'display_selected_date_clapi_in_checkout');


function display_selected_date_brunch_in_checkout()
{
   global $woocommerce;
   $brunch_in_cart = false;

   foreach ($woocommerce->cart->get_cart() as $cart_item_key => $cart_item) {
      $_product = $cart_item['data'];
      if (has_term('Brunch', 'product_cat', $_product->get_id())) {
         $brunch_in_cart = true;
         break;
      }
   }

   if ($brunch_in_cart && isset($_COOKIE['selected_date_brunch'])) {
      $selected_date_brunch = $_COOKIE['selected_date_brunch'];
      echo '<span class="selected-date-checkout">';
      echo 'Date de livraison choisie pour votre Brunch : ' . esc_html($selected_date_brunch);
      echo '</span>';
   }
}
add_action('woocommerce_checkout_before_order_review', 'display_selected_date_brunch_in_checkout');


//AFFICHAGE DATE CLAPIOTTE DANS LA COMMANDE BACKOFFICE
add_action('woocommerce_admin_order_data_after_billing_address', 'display_selected_date_clapi_in_admin_order');

function display_selected_date_clapi_in_admin_order($order)
{
   $order_id = $order->get_id();
   $selected_date_clapi = get_post_meta($order_id, '_selected_date_clapi', true);
   $selected_date_clapi_2 = get_post_meta($order_id, 'selected_date_clapi', true);
   error_log('Selected date clapi: ' . $selected_date_clapi);

   if (!empty($selected_date_clapi)) {
      echo '<h1><strong>Date de livraison pour les Clapiottes :</strong> ' . esc_html($selected_date_clapi) . '</h1>';
   }
}

// AFFICHAGE DATE BRUNCH DANS LA COMMANDE BACKOFFICE
add_action('woocommerce_admin_order_data_after_billing_address', 'display_selected_date_brunch_in_admin_order');

function display_selected_date_brunch_in_admin_order($order)
{
   $order_id = $order->get_id();
   $selected_date_brunch = get_post_meta($order_id, '_selected_date_brunch', true);
   $selected_date_brunch_2 = get_post_meta($order_id, 'selected_date_brunch', true);
   error_log('Selected date brunch: ' . $selected_date_brunch);

   if (!empty($selected_date_brunch)) {
      echo '<h1><strong>Date de livraison pour le Brunch :</strong> ' . esc_html($selected_date_brunch) . '</h1>';
   }
}


//On décrémente le stock quand le commande est validée

// Fonction pour reformatage de la date
function reformat_date_clapi($received_date)
{
   $months = [
      'janvier' => '01',
      'février' => '02',
      'mars' => '03',
      'avril' => '04',
      'mai' => '05',
      'juin' => '06',
      'juillet' => '07',
      'août' => '08',
      'septembre' => '09',
      'octobre' => '10',
      'novembre' => '11',
      'décembre' => '12'
   ];

   $dateComponents = explode(" ", $received_date);
   $day = str_pad($dateComponents[0], 2, '0', STR_PAD_LEFT);
   $month = $months[strtolower($dateComponents[1])];
   $year = $dateComponents[2];
   return "$year-$month-$day";
}

add_action('woocommerce_order_status_completed', 'decrement_stock_on_order_complete');

function decrement_stock_on_order_complete($order_id)
{
   global $wpdb;

   // Récupération de l'objet commande
   $order = wc_get_order($order_id);

   // 1. Pour les Clapiottes
   $selected_date_clapi = get_post_meta($order_id, '_selected_date_clapi', true);
   decrement_product_stock($selected_date_clapi, 'Clapiottes', 'wp_clapiresa', $order);

   // 2. Pour les Brunchs
   $selected_date_brunch = get_post_meta($order_id, '_selected_date_brunch', true);
   decrement_product_stock($selected_date_brunch, 'Brunch', 'wp_brunchresa', $order);
}

function decrement_product_stock($selected_date, $product_category, $db_table, $order)
{
   global $wpdb;

   if (!empty($selected_date)) {
      // Reformatez la date
      $selected_date_sql = reformat_date_clapi($selected_date);

      // Calcul du nombre total d'articles pour ce produit dans la commande
      $total_quantity = 0;
      foreach ($order->get_items() as $item_id => $item_data) {
         // Obtenez le produit de l'article
         $product = $item_data->get_product();

         // Vérifiez si le produit appartient à une certaine catégorie
         if (has_term($product_category, 'product_cat', $product->get_id())) {
            $total_quantity += $item_data->get_quantity();
         }
      }

      // Décrémentez la capacité de production pour cette date dans la table de réservation correspondante
      if ($total_quantity > 0) {
         $wpdb->query($wpdb->prepare(
            "UPDATE $db_table SET production_capacity = production_capacity - %d WHERE reservation_date = %s",
            $total_quantity,
            $selected_date_sql
         ));
      }
   }
}




