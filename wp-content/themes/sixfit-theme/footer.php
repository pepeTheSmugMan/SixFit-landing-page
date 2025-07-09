<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package SixFit_Theme
 */

?>

	<footer id="colophon" class="site-footer">
		<div class="footer-info-wrapper">
			<div class="footer-info-block">
				<h3>title</h3>
				<a href="https://google.com">tekst</a>
				<a href="https://google.com">tekst</a>
			</div>
			<div class="footer-info-block">
				<h3>titleerfefg</h3>
				<a href="https://google.com">teksfgsdfgdsfst</a>
				<a href="https://google.com">teksgsdgdt</a>
			</div>
			<div class="footer-info-block">
				<h3>titleerf</h3>
				<a href="https://google.com">tekdfgdsfst</a>
				<a href="https://google.com">teksgsdgdt</a>
			</div>
		</div>
		<div class="site-info">
			<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'sixfit-theme' ) ); ?>">
				<?php
				/* translators: %s: CMS name, i.e. WordPress. */
				printf( esc_html__( 'Proudly powered by %s', 'sixfit-theme' ), 'WordPress' );
				?>
			</a>
			<span class="sep"> | </span>
				<?php
				/* translators: 1: Theme name, 2: Theme author. */
				printf( esc_html__( 'Theme: %1$s by %2$s.', 'sixfit-theme' ), 'sixfit-theme', '<a href="https://github.com/pepeTheSmugMan">Maksymilian Lipke</a>' );
				?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
