<?php get_header(); ?>

<main>
  <?php while (have_posts()): the_post(); ?>
    <article>
      <div>
        <?php the_title('<h1>', '</h1>'); ?>
        <?php the_content(); ?>
      </div>
    </article>
  <?php endwhile; ?>
</main>

<?php get_footer(); ?>
