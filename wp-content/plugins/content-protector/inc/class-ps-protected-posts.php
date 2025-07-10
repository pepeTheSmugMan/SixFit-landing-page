<?php

namespace passster;

/**
 * Class to handle protected posts functionality
 */
class PS_Protected_Posts {

	/**
	 * Contains instance or null
	 *
	 * @var object|null
	 */
	private static $instance = null;

	const PASSTER_META_KEY = 'passster_activate_protection';
	/**
	 * Returns instance of PS_Protected_Posts.
	 *
	 * @return object
	 */
	public static function get_instance() {
		if ( null === self::$instance || ! self::$instance instanceof PS_Protected_Posts ) {
			self::$instance = new PS_Protected_Posts();
		}

		return self::$instance;
	}

	/**
	 * Constructor
	 */
	public function __construct() {
		add_filter( 'pre_get_posts', array( $this, 'exclude_protected_posts_from_search' ) );
	}

	/**
	 * Exclude protected posts from search results for non-logged in users
	 *
	 * @param \WP_Query $query The WP_Query instance.
	 * @return \WP_Query
	 */
	public function exclude_protected_posts_from_search( $query ) {
		if ( ! $this->should_exclude_from_search( $query ) ) {
			return $query;
		}

		$meta_query = array(
			'relation' => 'AND',
			array(
				'relation' => 'OR',
				array(
					'key'     => self::PASSTER_META_KEY,
					'compare' => 'NOT EXISTS',
				),
				array(
					'key'     => self::PASSTER_META_KEY,
					'value'   => '1',
					'compare' => '!=',
				),
			),
		);

		$existing_meta_query = $query->get( 'meta_query', array() );
		if ( ! empty( $existing_meta_query ) ) {
			$meta_query = array_merge( array( 'relation' => 'AND' ), $existing_meta_query, array( $meta_query ) );
		}

		$query->set( 'meta_query', $meta_query );

		return $query;
	}

	/**
	 * Check if we should exclude protected posts from this query
	 *
	 * @param \WP_Query $query The WP_Query instance.
	 * @return boolean
	 */
	private function should_exclude_from_search( $query ) {
		// Skip if user is logged in as admin
		if ( current_user_can( 'manage_options' ) ) {
			return false;
		}

		// Check for regular search
		if ( ! is_admin() && $query->is_search() && $query->is_main_query() ) {
			return true;
		}

		// Check for REST API search
		if ( defined( 'REST_REQUEST' ) && REST_REQUEST && isset( $query->query_vars['s'] ) ) {
			return true;
		}

		return false;
	}
}
