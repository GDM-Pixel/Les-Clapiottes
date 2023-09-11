<?php
/**
 * This file contains helper functions for Elements.
 *
 * @package GP Premium
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access, please.
}

/**
 * Helper functions.
 */
class GeneratePress_Elements_Helper {
	/**
	 * Instance.
	 *
	 * @access private
	 * @var object Instance
	 * @since 1.7
	 */
	private static $instance;

	/**
	 * Initiator.
	 *
	 * @since 1.7
	 * @return object initialized object of class.
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Check to see if specific theme/GPP options exist and are set.
	 *
	 * @since 1.7
	 *
	 * @param string $option Option to check.
	 * @return bool
	 */
	public static function does_option_exist( $option ) {
		if ( function_exists( 'generate_get_defaults' ) ) {
			$theme_settings = wp_parse_args(
				get_option( 'generate_settings', array() ),
				generate_get_defaults()
			);

			if ( 'site-title' === $option ) {
				return $theme_settings['hide_title'] ? false : true;
			}

			if ( 'site-tagline' === $option ) {
				return $theme_settings['hide_tagline'] ? false : true;
			}

			if ( 'retina-logo' === $option ) {
				return $theme_settings['retina_logo'];
			}
		}

		if ( 'site-logo' === $option ) {
			return get_theme_mod( 'custom_logo' );
		}

		if ( function_exists( 'generate_menu_plus_get_defaults' ) ) {
			$menu_settings = wp_parse_args(
				get_option( 'generate_menu_plus_settings', array() ),
				generate_menu_plus_get_defaults()
			);

			if ( 'navigation-as-header' === $option ) {
				return $menu_settings['navigation_as_header'];
			}

			if ( 'mobile-logo' === $option ) {
				return $menu_settings['mobile_header_logo'];
			}

			if ( 'navigation-logo' === $option ) {
				return $menu_settings['sticky_menu_logo'];
			}

			if ( 'sticky-navigation' === $option ) {
				return 'false' !== $menu_settings['sticky_menu'] ? true : false;
			}

			if ( 'sticky-navigation-logo' === $option ) {
				return $menu_settings['sticky_navigation_logo'];
			}

			if ( 'mobile-header-branding' === $option ) {
				return $menu_settings['mobile_header_branding'];
			}

			if ( 'sticky-mobile-header' === $option ) {
				return 'disable' !== $menu_settings['mobile_header_sticky'] ? true : false;
			}
		}

		return false;
	}

	/**
	 * Check whether we should execute PHP or not.
	 */
	public static function should_execute_php() {
		$php = true;

		if ( defined( 'DISALLOW_FILE_EDIT' ) ) {
			$php = false;
		}

		return apply_filters( 'generate_hooks_execute_php', $php );
	}

	/**
	 * Build our HTML generated by the blocks.
	 *
	 * @since 1.11.0
	 *
	 * @param int $id The ID to check.
	 * @return string
	 */
	public static function build_content( $id ) {
		if ( ! function_exists( 'do_blocks' ) ) {
			return;
		}

		$block_element = get_post( $id );

		if ( ! $block_element || 'gp_elements' !== $block_element->post_type ) {
			return '';
		}

		if ( 'publish' !== $block_element->post_status || ! empty( $block_element->post_password ) ) {
			return '';
		}

		$block_type = get_post_meta( $id, '_generate_block_type', true );

		if ( 'site-footer' === $block_type ) {
			$block_element->post_content = str_replace( '{{current_year}}', date( 'Y' ), $block_element->post_content ); // phpcs:ignore -- Prefer date().
		}

		// Handle embeds for block elements.
		global $wp_embed;

		if ( is_object( $wp_embed ) && method_exists( $wp_embed, 'autoembed' ) ) {
			$block_element->post_content = $wp_embed->autoembed( $block_element->post_content );
		}

		return apply_filters( 'generate_do_block_element_content', do_blocks( $block_element->post_content ) );
	}

	/**
	 * Get our Element type label.
	 *
	 * @since 2.0.0
	 * @param string $type The type value.
	 */
	public static function get_element_type_label( $type ) {
		switch ( $type ) {
			case 'block':
				$label = __( 'Block', 'gp-premium' );
				break;

			case 'header':
				$label = __( 'Header', 'gp-premium' );
				break;

			case 'hook':
				$label = __( 'Hook', 'gp-premium' );
				break;

			case 'layout':
				$label = __( 'Layout', 'gp-premium' );
				break;

			case 'site-header':
				$label = __( 'Site Header', 'gp-premium' );
				break;

			case 'page-hero':
				$label = __( 'Page Hero', 'gp-premium' );
				break;

			case 'content-template':
				$label = __( 'Content Template', 'gp-premium' );
				break;

			case 'loop-template':
				$label = __( 'Loop Template', 'gp-premium' );
				break;

			case 'post-meta-template':
				$label = __( 'Post Meta Template', 'gp-premium' );
				break;

			case 'post-navigation-template':
				$label = __( 'Post Navigation', 'gp-premium' );
				break;

			case 'archive-navigation-template':
				$label = __( 'Archive Navigation', 'gp-premium' );
				break;

			case 'right-sidebar':
				$label = __( 'Right Sidebar', 'gp-premium' );
				break;

			case 'left-sidebar':
				$label = __( 'Left Sidebar', 'gp-premium' );
				break;

			case 'site-footer':
				$label = __( 'Site Footer', 'gp-premium' );
				break;

			default:
				$label = esc_html( str_replace( '-', ' ', ucfirst( $type ) ) );
				break;
		}

		return $label;
	}

	/**
	 * Check for content template conditions.
	 *
	 * @since 2.0.0
	 * @param int $post_id The post to check.
	 */
	public static function should_render_content_template( $post_id ) {
		$loop_item_display = get_post_meta( $post_id, '_generate_post_loop_item_display', true );
		$display = true;

		if ( 'has-term' === $loop_item_display ) {
			$tax = get_post_meta( $post_id, '_generate_post_loop_item_display_tax', true );

			if ( $tax ) {
				$term = get_post_meta( $post_id, '_generate_post_loop_item_display_term', true );

				// Add support for multiple comma separated terms.
				if ( ! empty( $term ) ) {
					$term = str_replace( ' ', '', $term );
					$term = explode( ',', $term );
				}

				if ( has_term( $term, $tax ) ) {
					$display = true;
				} else {
					$display = false;
				}
			}
		}

		if ( 'has-post-meta' === $loop_item_display ) {
			$post_meta_name = get_post_meta( $post_id, '_generate_post_loop_item_display_post_meta', true );

			if ( $post_meta_name ) {
				$post_meta = get_post_meta( get_the_ID(), $post_meta_name, true );

				if ( $post_meta ) {
					$display = true;
				} else {
					$display = false;
				}
			}
		}

		if ( 'is-first-post' === $loop_item_display ) {
			global $wp_query;

			if ( 0 === $wp_query->current_post && ! is_paged() ) {
				$display = true;
			} else {
				$display = false;
			}
		}

		return apply_filters( 'generate_should_render_content_template', $display, $post_id );
	}

	/**
	 * Build our entire list of hooks to display.
	 *
	 * @since 1.7
	 *
	 * @return array Our list of hooks.
	 */
	public static function get_available_hooks() {
		$hooks = array(
			'scripts' => array(
				'group' => esc_attr__( 'Scripts/Styles', 'gp-premium' ),
				'hooks' => array(
					'wp_head',
					'wp_body_open',
					'wp_footer',
				),
			),
			'header' => array(
				'group' => esc_attr__( 'Header', 'gp-premium' ),
				'hooks' => array(
					'generate_before_header',
					'generate_after_header',
					'generate_before_header_content',
					'generate_after_header_content',
					'generate_before_logo',
					'generate_after_logo',
					'generate_header',
				),
			),
			'navigation' => array(
				'group' => esc_attr__( 'Navigation', 'gp-premium' ),
				'hooks' => array(
					'generate_inside_navigation',
					'generate_after_primary_menu',
					'generate_inside_secondary_navigation',
					'generate_inside_mobile_menu',
					'generate_inside_mobile_menu_bar',
					'generate_inside_mobile_header',
					'generate_inside_slideout_navigation',
					'generate_after_slideout_navigation',
				),
			),
			'content' => array(
				'group' => esc_attr__( 'Content', 'gp-premium' ),
				'hooks' => array(
					'generate_inside_site_container',
					'generate_inside_container',
					'generate_before_main_content',
					'generate_after_main_content',
					'generate_before_content',
					'generate_after_content',
					'generate_after_entry_content',
					'generate_after_primary_content_area',
					'generate_before_entry_title',
					'generate_after_entry_title',
					'generate_after_entry_header',
					'generate_before_archive_title',
					'generate_after_archive_title',
					'generate_after_archive_description',
				),
			),
			'comments' => array(
				'group' => esc_attr__( 'Comments', 'gp-premium' ),
				'hooks' => array(
					'generate_before_comments_container',
					'generate_before_comments',
					'generate_inside_comments',
					'generate_below_comments_title',
				),
			),
			'sidebars' => array(
				'group' => esc_attr__( 'Sidebars', 'gp-premium' ),
				'hooks' => array(
					'generate_before_right_sidebar_content',
					'generate_after_right_sidebar_content',
					'generate_before_left_sidebar_content',
					'generate_after_left_sidebar_content',
				),
			),
			'footer' => array(
				'group' => esc_attr__( 'Footer', 'gp-premium' ),
				'hooks' => array(
					'generate_before_footer',
					'generate_after_footer',
					'generate_after_footer_widgets',
					'generate_before_footer_content',
					'generate_after_footer_content',
					'generate_footer',
				),
			),
		);

		if ( class_exists( 'WooCommerce' ) ) {
			$hooks['navigation']['hooks'][] = 'generate_mobile_cart_items';

			$hooks['woocommerce-global'] = array(
				'group' => esc_attr__( 'WooCommerce - Global', 'gp-premium' ),
				'hooks' => array(
					'woocommerce_before_main_content',
					'woocommerce_after_main_content',
					'woocommerce_sidebar',
					'woocommerce_breadcrumb',
				),
			);

			$hooks['woocommerce-shop'] = array(
				'group' => esc_attr__( 'WooCommerce - Shop', 'gp-premium' ),
				'hooks' => array(
					'woocommerce_archive_description',
					'woocommerce_before_shop_loop',
					'woocommerce_after_shop_loop',
					'woocommerce_before_shop_loop_item_title',
					'woocommerce_after_shop_loop_item_title',
				),
			);

			$hooks['woocommerce-product'] = array(
				'group' => esc_attr__( 'WooCommerce - Product', 'gp-premium' ),
				'hooks' => array(
					'woocommerce_before_single_product',
					'woocommerce_before_single_product_summary',
					'woocommerce_after_single_product_summary',
					'woocommerce_single_product_summary',
					'woocommerce_share',
					'woocommerce_simple_add_to_cart',
					'woocommerce_before_add_to_cart_form',
					'woocommerce_after_add_to_cart_form',
					'woocommerce_before_add_to_cart_button',
					'woocommerce_after_add_to_cart_button',
					'woocommerce_before_add_to_cart_quantity',
					'woocommerce_after_add_to_cart_quantity',
					'woocommerce_product_meta_start',
					'woocommerce_product_meta_end',
					'woocommerce_after_single_product',
				),
			);

			$hooks['woocommerce-cart'] = array(
				'group' => esc_attr__( 'WooCommerce - Cart', 'gp-premium' ),
				'hooks' => array(
					'woocommerce_before_calculate_totals',
					'woocommerce_after_calculate_totals',
					'woocommerce_before_cart',
					'woocommerce_after_cart_table',
					'woocommerce_before_cart_table',
					'woocommerce_before_cart_contents',
					'woocommerce_cart_contents',
					'woocommerce_after_cart_contents',
					'woocommerce_cart_coupon',
					'woocommerce_cart_actions',
					'woocommerce_before_cart_totals',
					'woocommerce_cart_totals_before_order_total',
					'woocommerce_cart_totals_after_order_total',
					'woocommerce_proceed_to_checkout',
					'woocommerce_after_cart_totals',
					'woocommerce_after_cart',
				),
			);

			$hooks['woocommerce-checkout'] = array(
				'group' => esc_attr__( 'WooCommerce - Checkout', 'gp-premium' ),
				'hooks' => array(
					'woocommerce_before_checkout_form',
					'woocommerce_checkout_before_customer_details',
					'woocommerce_checkout_after_customer_details',
					'woocommerce_checkout_billing',
					'woocommerce_before_checkout_billing_form',
					'woocommerce_after_checkout_billing_form',
					'woocommerce_before_order_notes',
					'woocommerce_after_order_notes',
					'woocommerce_checkout_shipping',
					'woocommerce_checkout_before_order_review',
					'woocommerce_checkout_order_review',
					'woocommerce_review_order_before_cart_contents',
					'woocommerce_review_order_after_cart_contents',
					'woocommerce_review_order_before_order_total',
					'woocommerce_review_order_after_order_total',
					'woocommerce_review_order_before_payment',
					'woocommerce_review_order_before_submit',
					'woocommerce_review_order_after_submit',
					'woocommerce_review_order_after_payment',
					'woocommerce_checkout_after_order_review',
					'woocommerce_after_checkout_form',
				),
			);

			$hooks['woocommerce-account'] = array(
				'group' => esc_attr__( 'WooCommerce - Account', 'gp-premium' ),
				'hooks' => array(
					'woocommerce_before_account_navigation',
					'woocommerce_account_navigation',
					'woocommerce_after_account_navigation',
				),
			);
		}

		if ( function_exists( 'generate_is_using_flexbox' ) && generate_is_using_flexbox() ) {
			$hooks['navigation']['hooks'][] = 'generate_menu_bar_items';
		}

		if ( defined( 'GENERATE_VERSION' ) && version_compare( GENERATE_VERSION, '3.0.0-alpha.1', '>' ) ) {
			$hooks['navigation']['hooks'][] = 'generate_before_navigation';
			$hooks['navigation']['hooks'][] = 'generate_after_navigation';
			$hooks['navigation']['hooks'][] = 'generate_after_mobile_menu_button';
			$hooks['navigation']['hooks'][] = 'generate_inside_mobile_menu_control_wrapper';

			$hooks['content']['hooks'][] = 'generate_after_loop';
			$hooks['content']['hooks'][] = 'generate_before_do_template_part';
			$hooks['content']['hooks'][] = 'generate_after_do_template_part';
		}

		return apply_filters( 'generate_hooks_list', $hooks );
	}
}