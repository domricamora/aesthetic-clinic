<?php

/*
 * Renders the brand mark into every file that needs it:
 *
 *   public/favicon.svg, public/favicon.ico (32px), public/apple-touch-icon.png (180px),
 *   public/media/brand/mark.svg
 *
 *     php scripts/build-mark.php
 *
 * The mark is three nested sweeping arcs on a rounded clay square, the same
 * geometry as resources/js/components/brand-mark.tsx. Change both together.
 * Only GD is assumed, so the PNGs are drawn at 8x and downsampled for clean
 * edges.
 */

const CLAY = [164, 96, 79];
const CANVAS = [251, 246, 243];

// Quadratic curves in a 64x64 box: [x0, y0, cx, cy, x1, y1].
const ARCS = [
    [17, 44, 24, 24, 47, 18],
    [23, 47, 30, 32, 47, 27],
    [29, 50, 36, 40, 47, 36],
];

$svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
    .'<rect width="64" height="64" rx="15" fill="#A4604F"/>'
    .'<g fill="none" stroke="#FBF6F3" stroke-width="3.4" stroke-linecap="round">';
foreach (ARCS as [$x0, $y0, $cx, $cy, $x1, $y1]) {
    $svg .= "<path d=\"M{$x0} {$y0}Q{$cx} {$cy} {$x1} {$y1}\"/>";
}
$svg .= '</g></svg>'."\n";

$root = dirname(__DIR__).'/public';
@mkdir("$root/media/brand", 0775, true);
file_put_contents("$root/favicon.svg", $svg);
file_put_contents("$root/media/brand/mark.svg", $svg);

function render(int $size): GdImage
{
    $s = 8;
    $big = $size * $s;
    $k = $big / 64;
    $im = imagecreatetruecolor($big, $big);
    imagesavealpha($im, true);
    imagefill($im, 0, 0, imagecolorallocatealpha($im, 0, 0, 0, 127));
    $clay = imagecolorallocate($im, ...CLAY);
    $ink = imagecolorallocate($im, ...CANVAS);

    // Rounded square: two rects plus four corner discs.
    $r = (int) round(15 * $k);
    imagefilledrectangle($im, $r, 0, $big - $r - 1, $big - 1, $clay);
    imagefilledrectangle($im, 0, $r, $big - 1, $big - $r - 1, $clay);
    foreach ([[$r, $r], [$big - $r - 1, $r], [$r, $big - $r - 1], [$big - $r - 1, $big - $r - 1]] as [$x, $y]) {
        imagefilledellipse($im, $x, $y, 2 * $r, 2 * $r, $clay);
    }

    // Each arc as a run of discs, which gives round caps and an even stroke.
    $w = (int) round(3.4 * $k);
    foreach (ARCS as [$x0, $y0, $cx, $cy, $x1, $y1]) {
        for ($t = 0; $t <= 1; $t += 0.004) {
            $x = (1 - $t) ** 2 * $x0 + 2 * (1 - $t) * $t * $cx + $t ** 2 * $x1;
            $y = (1 - $t) ** 2 * $y0 + 2 * (1 - $t) * $t * $cy + $t ** 2 * $y1;
            imagefilledellipse($im, (int) round($x * $k), (int) round($y * $k), $w, $w, $ink);
        }
    }

    $out = imagecreatetruecolor($size, $size);
    imagesavealpha($out, true);
    imagefill($out, 0, 0, imagecolorallocatealpha($out, 0, 0, 0, 127));
    imagecopyresampled($out, $im, 0, 0, 0, 0, $size, $size, $big, $big);

    return $out;
}

imagepng(render(180), "$root/apple-touch-icon.png");

// An .ico is a 6-byte header, one 16-byte directory entry, then a PNG.
ob_start();
imagepng(render(32));
$png = ob_get_clean();
$ico = pack('vvv', 0, 1, 1).pack('CCCCvvVV', 32, 32, 0, 0, 1, 32, strlen($png), 22).$png;
file_put_contents("$root/favicon.ico", $ico);

echo "Mark written to favicon.svg, favicon.ico, apple-touch-icon.png and media/brand/mark.svg\n";
