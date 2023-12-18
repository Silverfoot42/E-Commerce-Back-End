const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll ({
      include: [Product],
    });
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findOne ({
      where: { id: req.params.id },
      include: [
        { model: Product },
      ]
    });
    res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create ({
      tag_name: req.body.tag_name
    });
    res.status(200).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagId = req.params.id;

  try {
    const tagToUpdate = await Tag.findByPk(tagId);

    if(!tagToUpdate) {
      return res.status(404).json({ message: 'Tag not found' });
    }
      
    await tagToUpdate.update ({
      tag_name: req.body.tag_name,
    });

    res.status(200).json(tagToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tagId = req.params.id;

  try {
    const tagToDelete = await Tag.findByPk(tagId);

    if (!tagToDelete) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    await tagToDelete.destroy();

    res.status(204).json({ message: 'Tag deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;