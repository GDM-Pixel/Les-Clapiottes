<?php
/*
Plugin Name: DC Maintenance
Plugin URI: https://digital-cookie.io
Description: Plugin to set a 'Coming Soon' page and 'Maintenance' mode
Version: 1.0
Author: Digital Cookie SAS
Author URI: https://digital-cookie.io
*/

//Activation et désactivation du plugin

function dc_maintenance_install()
{
    $default_options = [
        "dc_maintenance_status" => "off",
        "dc_maintenance_page" => "",
        "dc_maintenance_page_type" => "",
        "dc_maintenance_message" =>
        "Le site est actuellement en maintenance. Veuillez revenir plus tard.",
        "background_color" => "#ffffff", // Ajoutez cette ligne
    ];
    add_option("dc_maintenance_options", $default_options);
}
register_activation_hook(__FILE__, "dc_maintenance_install");

function dc_maintenance_deactivation()
{
    delete_option("dc_maintenance_options");
}
register_deactivation_hook(__FILE__, "dc_maintenance_deactivation");

function dc_maintenance_settings_page()
{
?>
    <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
    <form action="options.php" method="post">
        <?php
        // output security fields for the registered setting "dc_maintenance"
        settings_fields("dc_maintenance");
        // output setting sections and their fields
        do_settings_sections("dc_maintenance");
        // output save settings button
        submit_button("Enregistrer"); ?>
    </form>

<?php
}

function dc_maintenance_status_render()
{
    $options = get_option("dc_maintenance_options");
    $status = isset($options["dc_maintenance_status"])
        ? $options["dc_maintenance_status"]
        : "off";
?>
    <input type="checkbox" name="dc_maintenance_options[dc_maintenance_status]" <?php checked(
                                                                                    $status,
                                                                                    "on"
                                                                                ); ?> value="on"> Je passe en maintenance
<?php
}

function dc_maintenance_page_type_render()
{
    $options = get_option("dc_maintenance_options");
    $page_type = isset($options["dc_maintenance_page_type"])
        ? $options["dc_maintenance_page_type"]
        : "default";
?>
    <select name="dc_maintenance_options[dc_maintenance_page_type]">
        <option value="default" <?php selected(
                                    $page_type,
                                    "default"
                                ); ?>>Utiliser un modèle prédefini</option>
        <option value="custom" <?php selected(
                                    $page_type,
                                    "custom"
                                ); ?>>Utiliser une page que j'ai créé</option>
    </select>
<?php
}

function dc_maintenance_page_render()
{
    $options = get_option("dc_maintenance_options");
    $page = isset($options["dc_maintenance_page"])
        ? $options["dc_maintenance_page"]
        : "";
    $dropdown_args = [
        "name" => "dc_maintenance_options[dc_maintenance_page]",
        "selected" => $page,
    ];
    wp_dropdown_pages($dropdown_args);
}

function dc_maintenance_background_color_render()
{
    $options = get_option("dc_maintenance_options"); ?>
    <input type="text" name="dc_maintenance_options[background_color]" value="<?php echo $options["background_color"]; ?>" class="my-color-field" />
<?php
}
add_action("admin_enqueue_scripts", "dc_maintenance_enqueue_color_picker");

function dc_maintenance_enqueue_color_picker($hook_suffix)
{
    if ("settings_page_dc_maintenance" != $hook_suffix) {
        return;
    }

    wp_enqueue_style("wp-color-picker");
    wp_enqueue_script(
        "my-script-handle",
        plugins_url("js/dc-maintenance.js", __FILE__),
        ["wp-color-picker"],
        false,
        true
    );
}

function dc_maintenance_image_url_render()
{
    $options = get_option("dc_maintenance_options");
    $image_url = isset($options["dc_maintenance_image_url"])
        ? $options["dc_maintenance_image_url"]
        : "";
?>
    <input type="text" id="image_url" name="dc_maintenance_options[dc_maintenance_image_url]" value="<?php echo esc_attr(
                                                                                                            $image_url
                                                                                                        ); ?>">
    <input type="button" name="upload-btn" id="upload-btn" class="button-secondary" value="Ajouter une image">
<?php
}

function dc_maintenance_dark_mode_render()
{
    $options = get_option("dc_maintenance_options");
    $dark_mode = isset($options["dc_maintenance_dark_mode"])
        ? $options["dc_maintenance_dark_mode"]
        : "";
?>
    <input type="checkbox" name="dc_maintenance_options[dc_maintenance_dark_mode]" <?php checked(
                                                                                        $dark_mode,
                                                                                        "on"
                                                                                    ); ?>>
    <label for="dc_maintenance_dark_mode">Mode sombre</label>
<?php
}

function dc_maintenance_title_render()
{
    $options = get_option("dc_maintenance_options");
    $title = isset($options["dc_maintenance_title"])
        ? $options["dc_maintenance_title"]
        : "";
?><div id="dc_maintenance_custom_field">
        <input type="text" name="dc_maintenance_options[dc_maintenance_title]" value="<?php echo esc_attr(
                                                                                            $title
                                                                                        ); ?>">
    <?php
}

function dc_maintenance_paragraph_render()
{
    $options = get_option("dc_maintenance_options");
    $paragraph = isset($options["dc_maintenance_paragraph"])
        ? $options["dc_maintenance_paragraph"]
        : "";
    ?>
        <textarea name="dc_maintenance_options[dc_maintenance_paragraph]" rows="5" cols="50"><?php echo esc_textarea(
                                                                                                    $paragraph
                                                                                                ); ?></textarea>
    <?php
}

function dc_maintenance_countdown_render()
{
    $options = get_option("dc_maintenance_options");
    $countdown = isset($options["dc_maintenance_countdown"])
        ? $options["dc_maintenance_countdown"]
        : "";
    ?>
        <input type="text" class="date-picker" name="dc_maintenance_options[dc_maintenance_countdown]" value="<?php echo esc_attr(
                                                                                                                    $countdown
                                                                                                                ); ?>">
    <?php
}

function dc_maintenance_facebook_render()
{
    $options = get_option("dc_maintenance_options");
    $facebook = isset($options["dc_maintenance_facebook"])
        ? $options["dc_maintenance_facebook"]
        : "";
    ?>
        <textarea name="dc_maintenance_options[dc_maintenance_facebook]" rows="5" cols="50"><?php echo esc_textarea(
                                                                                                $facebook
                                                                                            ); ?></textarea>
    <?php
}

function dc_maintenance_twitter_render()
{
    $options = get_option("dc_maintenance_options");
    $twitter = isset($options["dc_maintenance_twitter"])
        ? $options["dc_maintenance_twitter"]
        : "";
    ?>
        <textarea name="dc_maintenance_options[dc_maintenance_twitter]" rows="5" cols="50"><?php echo esc_textarea(
                                                                                                $twitter
                                                                                            ); ?></textarea>
    <?php
}

function dc_maintenance_instagram_render()
{
    $options = get_option("dc_maintenance_options");
    $instagram = isset($options["dc_maintenance_instagram"])
        ? $options["dc_maintenance_instagram"]
        : "";
    ?>
        <textarea name="dc_maintenance_options[dc_maintenance_instagram]" rows="5" cols="50"><?php echo esc_textarea(
                                                                                                    $instagram
                                                                                                ); ?></textarea>
    </div>
<?php
}

//Enregistrer les réglages
function dc_maintenance_section_callback()
{
    // vide
}

function dc_maintenance_settings_init()
{
    $options = get_option("dc_maintenance_options");
    if (!is_array($options)) {
        // L'option n'existe pas ou n'est pas un tableau, alors la créer
        $default_options = [
            "dc_maintenance_status" => "off",
            "dc_maintenance_page" => "",
            "dc_maintenance_page_type" => "",
        ];
        update_option("dc_maintenance_options", $default_options);
        $options = get_option("dc_maintenance_options");
    }

    register_setting("dc_maintenance", "dc_maintenance_options");

    // Ajouter un champ de réglages pour le type de page "Coming Soon"
    add_settings_field(
        "dc_maintenance_page_type",
        "Quelle page utiliser ?",
        "dc_maintenance_page_type_render",
        "dc_maintenance",
        "dc_maintenance_section"
    );

    // Ajouter une section de réglages
    add_settings_section(
        "dc_maintenance_section",
        "Mettre le site en maintenance ?",
        "dc_maintenance_section_callback",
        "dc_maintenance"
    );

    // Ajouter un champ de réglages pour la sélection de la page "Coming Soon"
    add_settings_field(
        "dc_maintenance_page",
        "Définir la page de maintenance",
        "dc_maintenance_page_render",
        "dc_maintenance",
        "dc_maintenance_section"
    );

    // AJOUT DE L'IMAGE
    add_settings_field(
        "background_color",
        "Couleur de fond",
        "dc_maintenance_background_color_render",
        "dc_maintenance",
        "dc_maintenance_section"
    );

    // AJOUT DE L'IMAGE
    add_settings_field(
        "dc_maintenance_image_url",
        "Image de fond",
        "dc_maintenance_image_url_render",
        "dc_maintenance",
        "dc_maintenance_section"
    );

    add_settings_field(
        "dc_maintenance_dark_mode",
        "Dark Mode",
        "dc_maintenance_dark_mode_render",
        "dc_maintenance",
        "dc_maintenance_section"
    );

    add_settings_field(
        "dc_maintenance_title",
        "Titre",
        "dc_maintenance_title_render",
        "dc_maintenance",
        "dc_maintenance_section"
    );

    add_settings_field(
        "dc_maintenance_paragraph",
        "Paragraphe",
        "dc_maintenance_paragraph_render",
        "dc_maintenance",
        "dc_maintenance_section"
    );

    add_settings_field(
        "dc_maintenance_countdown",
        "Date de remise en ligne du site",
        "dc_maintenance_countdown_render",
        "dc_maintenance",
        "dc_maintenance_section"
    );

    add_settings_field(
        "dc_maintenance_facebook",
        "Page Facebook",
        "dc_maintenance_facebook_render",
        "dc_maintenance",
        "dc_maintenance_section"
    );

    add_settings_field(
        "dc_maintenance_twitter",
        "Page Twitter",
        "dc_maintenance_twitter_render",
        "dc_maintenance",
        "dc_maintenance_section"
    );

    add_settings_field(
        "dc_maintenance_instagram",
        "Compte Instagram",
        "dc_maintenance_instagram_render",
        "dc_maintenance",
        "dc_maintenance_section"
    );

    // Ajouter un champ de réglages pour le statut de la page "Coming Soon"
    add_settings_field(
        "dc_maintenance_status",
        "Activer la maintenance",
        "dc_maintenance_status_render",
        "dc_maintenance",
        "dc_maintenance_section"
    );
}
add_action("admin_init", "dc_maintenance_settings_init");

//Redirection des utilisateurs vers la page "Coming Soon"

function dc_maintenance_redirect()
{
    $options = get_option("dc_maintenance_options");

    if (
        is_array($options) &&
        $options["dc_maintenance_status"] == "on" &&
        !current_user_can("edit_themes")
    ) {
        if (
            !empty($options["dc_maintenance_page"]) &&
            $options["dc_maintenance_page_type"] == "custom" &&
            !is_page($options["dc_maintenance_page"])
        ) {
            // Redirigez vers la page spécifiée
            $page = get_permalink($options["dc_maintenance_page"]);
            wp_redirect($page, 302);
            exit();
        } elseif ($options["dc_maintenance_page_type"] == "default") {
            $template = plugin_dir_path(__FILE__) . "maintenance.php";
            $title = $options["dc_maintenance_title"];
            $background_color = $options["background_color"];
            $image_url = $options["dc_maintenance_image_url"];
            $dark_mode = $options["dc_maintenance_dark_mode"];
            $paragraph = $options["dc_maintenance_paragraph"];
            $countdown = $options["dc_maintenance_countdown"];
            $facebook = $options["dc_maintenance_facebook"];
            $twitter = $options["dc_maintenance_twitter"];
            $instagram = $options["dc_maintenance_instagram"];
            include $template;
            exit();
        }
    }
}
add_action("template_redirect", "dc_maintenance_redirect");

//Renvoyer un en-tête 503

function dc_maintenance_maintenance_header($template)
{
    $options = get_option("dc_maintenance_options");

    if ($options["dc_maintenance_status"] == "on" &&is_page($options["dc_maintenance_page"])) {
        header("HTTP/1.1 503 Service Temporarily Unavailable");
        header("Status: 503 Service Temporarily Unavailable");
        header("Retry-After: 86400"); // in seconds
    }

    return $template;
}
add_action("template_redirect", "dc_maintenance_maintenance_header", 1);

//Créer une page de réglages du plugin

function dc_maintenance_menu()
{
    add_options_page(
        "Digital Cookie Maintenance mode",
        "Digital Cookie Maintenance mode",
        "manage_options",
        "dc_maintenance",
        "dc_maintenance_settings_page"
    );
}
add_action("admin_menu", "dc_maintenance_menu");

function dc_maintenance_enqueue_script($hook)
{
    if ("settings_page_dc_maintenance" != $hook) {
        return;
    }
    // Enqueue WordPress media scripts
    wp_enqueue_media();
    // Enqueue jQuery UI and DatePicker
    wp_enqueue_script("jquery-ui-datepicker");
    wp_enqueue_script(
        "jquery-ui-timepicker",
        plugin_dir_url(__FILE__) .
            "js/timepicker/jquery-ui-timepicker-addon.js",
        ["jquery", "jquery-ui-datepicker"],
        "1.6.3",
        true
    );
    wp_enqueue_style(
        "jquery-ui-style",
        "//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css"
    );
    wp_enqueue_style(
        "jquery-ui-timepicker-style",
        plugin_dir_url(__FILE__) .
            "js/timepicker/jquery-ui-timepicker-addon.css"
    );

    // Enqueue your custom script
    wp_register_script(
        "digital-cookie-admin-js",
        plugin_dir_url(__FILE__) . "js/dc-maintenance.js",
        ["jquery"],
        "1.0",
        true
    );
    wp_enqueue_script("digital-cookie-admin-js");
}
add_action("admin_enqueue_scripts", "dc_maintenance_enqueue_script");
