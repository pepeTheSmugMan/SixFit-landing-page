<?php

namespace passster;

class PS_Upsells {
	/**
	 * Contains instance or null
	 *
	 * @var object|null
	 */
	private static $instance = null;

	/**
	 * Returns instance of PS_Upsells.
	 *
	 * @return object
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Setting up admin fields
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
		add_action( 'admin_print_scripts', array( $this, 'add_settings_scripts' ) );
	}

	public function add_menu() {

		add_submenu_page(
			'passster',
			__( 'Password Lists', 'content-protector' ),
			__( 'Password Lists', 'content-protector' ),
			apply_filters( 'passster_user_capability', 'manage_options' ),
			'#password-lists',
			'__return_false',
		);

		add_submenu_page(
			'passster',
			__( 'Statistics', 'content-protector' ),
			__( 'Statistics', 'content-protector' ),
			apply_filters( 'passster_user_capability', 'manage_options' ),
			'#statistics',
			'__return_false',
		);
	}

	public function register_rest_routes() {
		register_rest_route(
			'passster/v1',
			'/password-lists-modal',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'password_lists_modal_content' ),
				'permission_callback' => array( $this, 'rest_permission_callback' ),
			)
		);

		register_rest_route(
			'passster/v1',
			'/statistics-modal',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'statistics_lists_modal_content' ),
				'permission_callback' => array( $this, 'rest_permission_callback' ),
			)
		);
	}

	public function rest_permission_callback() {
		return current_user_can( apply_filters( 'passster_user_capability', 'manage_options' ) );
	}

	public function password_lists_modal_content() {
		ob_start();
		?>
		<div class="passster-modal__overlay password-lists">
			<div class="passster-modal__frame <?php echo esc_attr( $settings['classes'] ); ?>" 
														<?php
														if ( $settings['dismissible'] ) :
															?>
				data-passster-modal-dismissible data-passster-modal-id="<?php echo esc_attr( $id ); ?>"<?php endif; ?>>
				<div class="passster-modal__header">
					<button class="passster-modal__dismiss">
						<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path></svg>
					</button>
				</div>
				<div class="passster-modal__body">
					<div class="passster-upsells-carousel-wrapper-modal">
						<div class="passster-upsells-carousel-modal">
							<div class="passster-upsell-modal passster-upsell-item-modal">
								<h2><?php esc_html_e( 'Password Lists', 'content-protector' ); ?></h2>
								<h4 class="passster-upsell-description-modal"><?php esc_html_e( 'Easily define multiple passwords to help protect your content.', 'content-protector' ); ?></h4>
								<ul class="passster-upsells-list-modal">
									<li><?php esc_html_e( 'You can also automatically generate the passwords with a simple button click.', 'content-protector' ); ?></li>
									<li><?php esc_html_e( 'Set expiry options for the passwords.', 'content-protector' ); ?></li>
									<li><?php esc_html_e( 'View your passwords usage and statistics.', 'content-protector' ); ?></li>
								</ul>
								<p>
									<?php

									$buttons  = '<a target="_blank" href="https://passster.com/#free-vs-pro"  class="button">' . esc_html__( 'Lite vs Pro', 'content-protector' ) . '</a>';
									$buttons .= '<a target="_blank" href="https://passster.com/#pricing" style="margin-top:10px;" class="button-primary button">' . esc_html__( 'Get Passster PRO!', 'content-protector' ) . '</a>';

									echo wp_kses_post( apply_filters( 'passster_upsell_buttons', $buttons, 'password-lists' ) );

									?>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>        
		<?php
		return rest_ensure_response( ob_get_clean() );
	}

	public function statistics_lists_modal_content() {
		ob_start();
		?>
		<div class="passster-modal__overlay statistics">
			<div class="passster-modal__frame <?php echo esc_attr( $settings['classes'] ); ?>" 
														<?php
														if ( $settings['dismissible'] ) :
															?>
				data-passster-modal-dismissible data-passster-modal-id="<?php echo esc_attr( $id ); ?>"<?php endif; ?>>
				<div class="passster-modal__header">
					<button class="passster-modal__dismiss">
						<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path></svg>
					</button>
				</div>
				<div class="passster-modal__body">
					<div class="passster-upsells-carousel-wrapper-modal">
						<div class="passster-upsells-carousel-modal">
							<div class="passster-upsell-modal passster-upsell-item-modal">
								<h2><?php esc_html_e( 'Statistics', 'content-protector' ); ?></h2>
								<h4 class="passster-upsell-description-modal"><?php esc_html_e( 'Statistics will give you a good overview of how your passwords are being used so you can address any issues and track usage.', 'content-protector' ); ?></h4>
								<ul class="passster-upsells-list-modal">
									<li><?php esc_html_e( 'Get information about the IP, password or browser used.', 'content-protector' ); ?></li>
									<li><?php esc_html_e( 'You can reset statistics.', 'content-protector' ); ?></li>
									<li><?php esc_html_e( 'You can also reset expiration statistics.', 'content-protector' ); ?></li>
								</ul>
								<p>
									<?php

									$buttons  = '<a target="_blank" href="https://passster.com/#free-vs-pro"  class="button">' . esc_html__( 'Lite vs Pro', 'content-protector' ) . '</a>';
									$buttons .= '<a target="_blank" href="https://passster.com/#pricing" style="margin-top:10px;" class="button-primary button">' . esc_html__( 'Get Passster PRO!', 'content-protector' ) . '</a>';

									echo wp_kses_post( apply_filters( 'passster_upsell_buttons', $buttons, 'statistics' ) );

									?>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>        
		<?php
		return rest_ensure_response( ob_get_clean() );
	}

	public function add_settings_scripts() {
		$screen = get_current_screen();

		wp_enqueue_script(
			'passster-upsells',
			PASSSTER_URL . '/inc/admin/upsells/Upsells.js',
			array(
				'wp-api',
				'wp-components',
				'wp-element',
				'wp-api-fetch',
				'wp-data',
				'wp-i18n',
			),
			PASSSTER_VERSION,
			true
		);

		wp_enqueue_style( 'passster-upsells-style', PASSSTER_URL . '/inc/admin/upsells/Upsells.css', array(), PASSSTER_VERSION );
	}
}
