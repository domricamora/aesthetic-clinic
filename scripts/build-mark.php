<?php

/*
 * Renders the brand mark into every file that needs it:
 *
 *   public/favicon.svg, public/favicon.ico (32px), public/apple-touch-icon.png (180px),
 *   public/media/brand/mark.svg
 *
 *     php scripts/build-mark.php
 *
 * The mark is a single-storey "a" on a rounded clay square: a round bowl, and a
 * stem whose top sweeps out to a calligraphic point and whose foot turns out in
 * a tail. Same geometry as resources/js/components/brand-mark.tsx (and the two
 * marks in public/media/brand/og-image.svg). Change them together.
 * Only GD is assumed, so the PNGs are drawn at 8x and downsampled for clean
 * edges.
 */

const CLAY = [164, 96, 79];
const CANVAS = [251, 246, 243];

// Bowl: a ring in the 64x64 box, [cx, cy, r, stroke width].
const BOWL = [30, 38.5, 8.8, 4.4];

// Sweep and stem, a closed outline: a start point, then lines [x, y] and
// quadratic curves [cx, cy, x, y].
const STEM_START = [17, 19.5];
const STEM = [
    [42.2, 14, 42.2, 31],
    [42.2, 42],
    [42.2, 47, 46, 48],
    [38.5, 50, 37.2, 44],
    [37.2, 31],
    [37.2, 20, 17, 19.5],
];

[$bx, $by, $br, $bw] = BOWL;
$d = 'M'.implode(' ', STEM_START);
foreach (STEM as $seg) {
    $d .= (count($seg) === 4 ? 'Q' : 'L').implode(' ', $seg);
}
$svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
    .'<rect width="64" height="64" rx="15" fill="#A4604F"/>'
    ."<circle cx=\"$bx\" cy=\"$by\" r=\"$br\" fill=\"none\" stroke=\"#FBF6F3\" stroke-width=\"$bw\"/>"
    ."<path fill=\"#FBF6F3\" d=\"{$d}Z\"/>"
    .'</svg>'."\n";

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

    // Bowl: a canvas disc with a clay counter punched back in.
    [$cx, $cy, $cr, $cw] = BOWL;
    $outer = (int) round(2 * ($cr + $cw / 2) * $k);
    $inner = (int) round(2 * ($cr - $cw / 2) * $k);
    imagefilledellipse($im, (int) round($cx * $k), (int) round($cy * $k), $outer, $outer, $ink);
    imagefilledellipse($im, (int) round($cx * $k), (int) round($cy * $k), $inner, $inner, $clay);

    // Sweep and stem: the outline flattened to a polygon.
    [$px, $py] = STEM_START;
    $points = [$px * $k, $py * $k];
    foreach (STEM as $seg) {
        if (count($seg) === 2) {
            [$px, $py] = $seg;
            array_push($points, $px * $k, $py * $k);

            continue;
        }
        [$qx, $qy, $x1, $y1] = $seg;
        for ($i = 1; $i <= 40; $i++) {
            $t = $i / 40;
            $x = (1 - $t) ** 2 * $px + 2 * (1 - $t) * $t * $qx + $t ** 2 * $x1;
            $y = (1 - $t) ** 2 * $py + 2 * (1 - $t) * $t * $qy + $t ** 2 * $y1;
            array_push($points, $x * $k, $y * $k);
        }
        [$px, $py] = [$x1, $y1];
    }
    imagefilledpolygon($im, array_map(fn ($v) => (int) round($v), $points), $ink);

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
