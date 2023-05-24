const db = require("../models")

async function postContent(req, res, next) {
  const { userId, name, url, genre, type } = req.body;

  if (!name || !url || !genre || !type) {
    return res.status(400).send({ message: "Missing required field" });
  }

  const content = new db.Content({
    userId,
    name,
    url,
    genre,
    type
  });

  try {
    const contentSaved = await content.save();
    if (!contentSaved) {
      return res.status(400).send({ status: 400 });
    }
    await db.User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { content: contentSaved._id } }
    )
    return res.status(200).send({ status: 200, content: contentSaved });
  } catch (err) {
    return res.status(500).send({ status: 500, error: err });
  }
}

async function getContent(req, res, next) {
  try {
    const contentStored = await db.Content.find().lean().exec();
    if (!contentStored) {
      return res.status(400).send({ status: 400 });
    }
    return res.status(200).send({ status: 200, content: contentStored });
  } catch (err) {
    return res.status(500).send({ status: 500, error: err });
  }
}

async function getContentById(req, res, next) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ status: 404 });
  }
  try {
    const contentStored = await db.Content.findById({ _id: id }).lean().exec();
    if (!contentStored) {
      return res.status(400).send({ status: 400 });
    }
    return res.status(200).send({ status: 200, content: contentStored });
  } catch (err) {
    return res.status(500).send({ status: 500, error: err });
  }
}

async function deleteContentById(req, res, next) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ status: 404 });
  }
  try {
    const contentStored = await db.Content.findByIdAndRemove({ _id: id }).lean().exec();
    if (!contentStored) {
      return res.status(400).send({ status: 400 });
    }
    return res.status(200).send({ status: 200});
  } catch (err) {
    return res.status(500).send({ status: 500, error: err });
  }
}



async function searchContent(req, res) {
	const { query } = req.params
	if (query.length < 2) {
		return res.status(404).send({ status: 404 })
	}
	try {
		const queryRegex = new RegExp(`${query}`, 'i')
		const content = await db.Content.find({ name: queryRegex }).lean().exec();
		

		if (!content) {
			return res.status(400).send({ status: 400 })
		}
		let contentArray = []
		

		content.forEach(item => contentArray.push({
			_id: item._id,
      name: item.name,
      url: item.url,
			type: item.type,
      genre: item.genre
		}));

		return res.status(200).send({
			status: 200,
			content:  contentArray
		})
	} catch (err) {
		return res.status(500).send({ status: 500, error: err })
	}
}


module.exports = {
  postContent,
  getContent,
  getContentById,
  searchContent,
  deleteContentById
}