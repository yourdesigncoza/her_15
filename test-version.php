<?php
/**
 * Simple test file to verify PHP code deployment and caching
 */

// Version tracking
define('TEST_VERSION', '1.0.0');
define('TEST_UPDATED', '2025-09-16 14:10:00');

// Cache-busting headers
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
header('Content-Type: application/json');

// Clear OPCache if available
if (function_exists('opcache_reset')) {
    opcache_reset();
}

echo json_encode([
    'test_version' => TEST_VERSION,
    'test_updated' => TEST_UPDATED,
    'current_time' => date('Y-m-d H:i:s'),
    'php_version' => PHP_VERSION,
    'server_time' => time(),
    'opcache_enabled' => function_exists('opcache_get_status') ? opcache_get_status()['opcache_enabled'] ?? false : false,
    'message' => 'Test file is working correctly!'
]);
?>