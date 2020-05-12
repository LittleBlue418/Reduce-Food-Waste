from flask_restful import Resource, reqparse

from models.tags import TagsModel


class Tag(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('icon',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )


    def get(self, tag_id):
        tag = TagsModel.query.get(tag_id)

        if tag is None:
            return {"message": "A tag with that ID does not exist"}, 404

        return tag.json()

    def put(self, tag_id):
        request_data = Tag.parser.parse_args()

        tag = TagsModel.query.get(tag_id)

        if tag is None:
            return {"message": "A tag with that ID does not exist"}, 404

        tag.name = request_data['name']
        tag.icon = request_data['icon']

        tag.save_to_db()

        return tag.json()

    def delete(self, tag_id):
        tag = TagsModel.query.get(tag_id)

        if tag is None:
            return {"message": "A tag with that ID does not exist"}, 404

        tag.delete_from_db()
        return {"message": "Tag deleted"}, 200



class TagCollection(Resource):
    def get(self):
        tag_list = [tag.json() for tag in TagsModel.query.all()]
        return {
            'tags': tag_list
        }


    def post(self):
        request_data = Tag.parser.parse_args()

        if TagsModel.find_by_name(request_data['name']):
            return {'message': "A tag with name '{}' already exists".format(request_data['name'])}, 400

        new_tag = TagsModel(**request_data)

        try:
            new_tag.save_to_db()
        except:
            return {"message": "An error occured"}, 500

        return new_tag.json()