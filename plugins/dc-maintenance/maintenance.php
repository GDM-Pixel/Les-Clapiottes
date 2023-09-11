<?php
header('HTTP/1.1 503 Service Temporarily Unavailable');
header('Status: 503 Service Temporarily Unavailable');
header('Retry-After: 86400'); // in seconds
?>

<!DOCTYPE html>
<html>

<head>
    <title>Site en maintenance</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            background-size: cover;
            background-repeat: no-repeat;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100vh;
            font-family: 'Open Sans', sans-serif;

        }

        #mainContainer {
            display: flex;
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
        }

        .row {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 40px;
            margin: 20px;
            border-radius: 9px;
            background: rgba(255, 255, 255, 0.5);
            border: solid 1px white;
        }


        .row img.logo {
            max-width: 150px;
            height: auto;
            align-self: center;
        }

        h1 {
            color: black;
        }

        .row p {
            font-size: 16px;
            color: black;
        }

        #countdown {
            color: black;
            font-size: 40px;
        }

        h3 {
            font-size: 24px;
            color: black;
            max-width:600px;
            margin:20px auto;
        }

        ul {
            margin: 0 auto;
            padding: 0;
            display: flex;
        }

        ul li {
            margin: 10px;
            list-style: none;
        }

        ul li svg {
            width: 50px;
            height: auto;
        }

        .darkmode {
            color: white;
        }

        .darkmode .row {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 40px;
            margin: 20px;
            border-radius: 9px;
            background: rgba(0, 0, 0, 0.5);
            border: solid 1px black;
        }

        .darkmode #countdown {
            color: white;
            font-size: 40px;
        }

        .darkmode h1 {
            color: white;
        }

        .darkmode .row p {
            color: white;
        }

        .darkmode h3 {
            color: white;
        }
    </style>
</head>

<body <?php
        echo ($dark_mode) ? 'class="darkmode"' : '';
        echo ' style="';
        echo (!empty($background_color)) ? 'background-color: ' . $background_color . ';' : '';
        echo (!empty($image_url)) ? 'background-image: url(\'' . $image_url . '\');' : '';
        echo '"';
        ?>>

    <div id="mainContainer">
        <div class="row">
            <?php
            $custom_logo_id = get_theme_mod('custom_logo');
            $logo = wp_get_attachment_image_src($custom_logo_id, 'full');
            if (has_custom_logo()) {
                echo '<img class="logo" src="' . esc_url($logo[0]) . '" alt="logo">';
            } else {
                echo '<h1>' . get_bloginfo('name') . '</h1>';
            }
            ?>
            <h1><?php echo $title; ?></h1>
            <p><?php echo $paragraph; ?></p>
            <?php echo (!empty($countdown)) ? '<p>Le site sera de retour d\'ici peu !</p>' : ''; ?>
            <div id="countdown"></div>
            <?php
            if (!empty($facebook) || !empty($twitter) || !empty($instagram)) {
                echo '<h3>En attendant, vous pouvez nous retrouver sur nos réseaux sociaux</h3>
            <ul>';
                echo (!empty($facebook)) ? '<li><a href="' . $facebook . '"><img src="' . plugins_url('img/facebook.png', __FILE__) . '" alt="Facebook"></a></li>' : '';
                echo (!empty($twitter)) ? '<li><a href="' . $twitter . '"><img src="' . plugins_url('img/twitter.png', __FILE__) . '" alt="Twitter"></a></li>' : '';
                echo (!empty($instagram)) ? '<li><a href="' . $instagram . '"><img src="' . plugins_url('img/instagram.png', __FILE__) . '" alt="Instagram"></a></li>' : '';
                echo '</ul>';
            }
            ?>


        </div>
    </div>

    <?php
    $formatted_date = date("m/d/Y H:i:s", strtotime(get_option('dc_maintenance_options')['dc_maintenance_countdown']));
    ?>

    <script>
        var countdownContainer = document.getElementById('countdown');
        var endDate = new Date("<?php echo $formatted_date; ?>");

        if (!isNaN(endDate)) {
            var intervalId = setInterval(function() {
                var now = new Date().getTime();
                var distance = endDate.getTime() - now;
                if (isNaN(distance)) {
                    countdownContainer.innerHTML = "Erreur dans le calcul du temps restant";
                    clearInterval(intervalId);
                    return;
                }

                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                var countdownText = '';
                if (days > 0) {
                    countdownText += days + 'J ';
                }
                if (hours > 0) {
                    countdownText += hours + 'H ';
                }
                if (minutes > 0) {
                    countdownText += minutes + 'm ';
                }
                countdownText += seconds + 's ';

                countdownContainer.innerHTML = countdownText;

                if (distance < 0) {
                    clearInterval(intervalId);
                    countdownContainer.innerHTML = 'Le site est de nouveau en ligne !';
                }
            }, 1000);
        } else {
            countdownContainer.innerHTML = "Erreur dans la conversion de la date";
        }
    </script>


</body>

</html>