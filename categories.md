---
layout: default
title: Categories
---
<h1>Categories</h1>
<ul>
  {% for category in site.categories %}
    <li>
      <a href="/categories/{{ category[0] | slugify }}/">{{ category[0] }}</a>
    </li>
  {% endfor %}
</ul>
