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
			<?php if ( is_active_sidebar( 'footer-info-wrapper' ) ) : ?>
				<?php dynamic_sidebar( 'footer-info-wrapper' ); ?>
			<?php endif; ?>
		</div>
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
