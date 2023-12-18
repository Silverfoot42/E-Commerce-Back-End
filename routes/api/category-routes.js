const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll ({
      include: [Product],
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findOne ({
      where: { id: req.params.id },
      include: [Product],
    });
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update (
    { category_name: req.body.category_name },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(updatedCategory => {
      console.log(updatedCategory);
      if (updatedCategory[0] === 0) {
        res.status(404).json({ message: 'Category not found' });
      } else {
        res.status(200).json({ message: 'Category updated'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(deletedCategory => {
      if (deletedCategory === 0) {
        res.status(404).json({ message: 'Category not found' });
      } else {
        res.status(200).json({ message: 'Category deleted successfully' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
